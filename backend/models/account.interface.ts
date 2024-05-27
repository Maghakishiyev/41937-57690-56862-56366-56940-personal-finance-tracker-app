import mongoose, { Document } from 'mongoose';

export interface IAccount extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    emoji: string;
    description?: string;
}
