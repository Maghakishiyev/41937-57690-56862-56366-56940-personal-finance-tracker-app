import mongoose, { Document } from 'mongoose';

export interface ICategory extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    icon: string;
    type: string; // 'Income' or 'Expense'
    description?: string;
}
