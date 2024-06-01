import mongoose, { Schema, Document } from 'mongoose';
import { ITrack } from './interface';
// Track schema definition
const trackSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: { type: String, required: true },
        amount: { type: String, required: true },
        type: { type: String, required: true }, // Assuming this is either 'Expense' or 'Income'
        category: { type: String, required: false },
        account: { type: String, required: false },
        note: { type: String, required: false },
        from: { type: String, required: false },
        to: { type: String, required: false },
        description: { type: String, required: false },
    },
    { timestamps: true }
);

export const Track = mongoose.model<ITrack>('Track', trackSchema);
