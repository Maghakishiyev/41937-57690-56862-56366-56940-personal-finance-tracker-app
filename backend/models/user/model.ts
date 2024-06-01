import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './interface';
const categorySchema = new Schema({
    _id: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    categoryIcon: { type: String, required: true },
    categoryType: { type: String, required: true }, // Assuming this is a string like '0' or '1'. Adjust type as needed.
    categoryDes: { type: String, required: false }
});

const trackSchema = new Schema({
    date: { type: String, required: true },
    amount: { type: String, required: true },
    type: { type: String },
    category: { type: String },
    account: { type: String },
    note: { type: String },
    from: { type: String },
    to: { type: String },
    description: { type: String },
    _id: { type: String, required: true, unique: true }
})


const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthday: { type: String, required: false },
    imageFile: { type: String, required: false },
    categories: { type: [categorySchema], default: [] },
    tracks: { type: [trackSchema], default: [] }

});

export const User = mongoose.model<IUser & Document>('User', userSchema);

