import express from 'express';
import { createReservation, getReservations, updateReservationStatus, getReservationByRef } from '../controllers/reservationController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createReservation)
  .get(protect, admin, getReservations);

router.route('/ref/:refId')
  .get(getReservationByRef);

router.route('/:id/status')
  .patch(protect, admin, updateReservationStatus);

export default router;
