import mongoose, { Schema } from 'mongoose';

const MenuSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['breakfast', 'brunch', 'lunch', 'dinner', 'bar'],
    },
    badges: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Menu', MenuSchema);
