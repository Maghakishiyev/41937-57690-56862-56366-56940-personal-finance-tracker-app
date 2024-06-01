import mongoose, { Schema } from 'mongoose';
import { IAccount } from './interface';

const accountSchema = new Schema<IAccount>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: { type: String, required: true },
    emoji: { type: String, required: true },
    description: { type: String },
});

export const Account = mongoose.model<IAccount>('Account', accountSchema);
