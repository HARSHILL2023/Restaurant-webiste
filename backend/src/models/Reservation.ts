import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  seatingPreference: 'Inside' | 'Terrace' | 'Elevated Terrace';
  dietaryRequirements?: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  referenceId: string;
}

const ReservationSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:mm
    guests: { type: Number, required: true },
    occasion: { type: String },
    seatingPreference: {
      type: String,
      required: true,
      enum: ['Inside', 'Terrace', 'Elevated Terrace'],
    },
    dietaryRequirements: { type: String },
    notes: { type: String },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
    referenceId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
