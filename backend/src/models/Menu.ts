import mongoose, { Document, Schema } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'brunch' | 'lunch' | 'dinner' | 'bar';
  badges: string[]; // e.g., 'veg', 'vegan', 'jain', 'bestseller', 'chef\'s pick'
  isAvailable: boolean;
  imageUrl?: string;
}

const MenuSchema: Schema = new Schema(
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

export default mongoose.model<IMenu>('Menu', MenuSchema);
