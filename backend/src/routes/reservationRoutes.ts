import express from 'express';
import { createReservation, getReservations, updateReservationStatus } from '../controllers/reservationController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .post(createReservation)
  .get(protect, admin, getReservations);

router.route('/:id/status')
  .patch(protect, admin, updateReservationStatus);

export default router;
