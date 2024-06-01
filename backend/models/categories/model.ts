import mongoose, { Schema } from 'mongoose';
import { ICategory } from './interface';

const categorySchema: Schema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);
