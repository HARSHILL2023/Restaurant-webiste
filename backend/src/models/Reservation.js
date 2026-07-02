import mongoose, { Schema } from 'mongoose';

const ReservationSchema = new Schema(
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
    expireAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

ReservationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Reservation', ReservationSchema);
