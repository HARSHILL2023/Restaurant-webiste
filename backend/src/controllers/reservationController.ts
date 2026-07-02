import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';

const SEATING_CAPACITY = {
  'Inside': 90,
  'Terrace': 70,
  'Elevated Terrace': 40,
};

// Helper to calculate time difference in minutes
const getMinutesFromTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
export const createReservation = async (req: Request, res: Response) => {
  try {
    const {
      firstName, lastName, email, phone, date, time, guests,
      occasion, seatingPreference, dietaryRequirements, notes
    } = req.body;

    // Validate seating preference
    if (!SEATING_CAPACITY[seatingPreference as keyof typeof SEATING_CAPACITY]) {
      return res.status(400).json({ message: 'Invalid seating preference' });
    }

    const requestedMinutes = getMinutesFromTime(time);
    
    // Check capacity (2 hour window)
    const existingReservations = await Reservation.find({
      date,
      seatingPreference,
      status: { $in: ['Pending', 'Confirmed'] }
    });

    let currentGuests = 0;
    existingReservations.forEach(res => {
      const resMinutes = getMinutesFromTime(res.time);
      // If reservation is within 120 minutes (2 hours) of requested time
      if (Math.abs(resMinutes - requestedMinutes) < 120) {
        currentGuests += res.guests;
      }
    });

    const maxCapacity = SEATING_CAPACITY[seatingPreference as keyof typeof SEATING_CAPACITY];
    
    if (currentGuests + guests > maxCapacity) {
      return res.status(400).json({ 
        message: 'Not enough capacity for this seating preference at the requested time.',
        availableSeats: Math.max(0, maxCapacity - currentGuests)
      });
    }

    const referenceId = crypto.randomBytes(4).toString('hex').toUpperCase();

    const reservation = await Reservation.create({
      firstName, lastName, email, phone, date, time, guests,
      occasion, seatingPreference, dietaryRequirements, notes,
      referenceId
    });

    // Send confirmation email (async, don't await if we want faster response, but better to await to ensure it works)
    try {
      await sendEmail({
        to: email,
        subject: `Reservation Request Received - The Ever House [${referenceId}]`,
        html: `
          <h1>Your Reservation Request</h1>
          <p>Hi ${firstName},</p>
          <p>We have received your reservation request for ${guests} people on ${date} at ${time}.</p>
          <p>Seating: ${seatingPreference}</p>
          <p>Your reference ID is: <strong>${referenceId}</strong></p>
          <p>We will confirm your booking shortly.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find({}).sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update reservation status
// @route   PATCH /api/reservations/:id/status
// @access  Private/Admin
export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.status = status;
      const updatedReservation = await reservation.save();

      // If confirmed, send email
      if (status === 'Confirmed') {
        try {
          await sendEmail({
            to: reservation.email,
            subject: `Reservation Confirmed - The Ever House [${reservation.referenceId}]`,
            html: `
              <h1>Your Reservation is Confirmed</h1>
              <p>Hi ${reservation.firstName},</p>
              <p>Your reservation for ${reservation.guests} people on ${reservation.date} at ${reservation.time} has been confirmed.</p>
              <p>Seating: ${reservation.seatingPreference}</p>
              <p>We look forward to hosting you!</p>
            `
          });
        } catch (e) {
          console.error(e);
        }
      }

      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
