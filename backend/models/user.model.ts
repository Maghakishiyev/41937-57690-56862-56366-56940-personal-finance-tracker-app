import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.interface';
const categorySchema = new Schema({
    _id: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    categoryIcon: { type: String, required: true },
    categoryType: { type: String, required: true }, // Assuming this is a string like '0' or '1'. Adjust type as needed.
    categoryDes: { type: String, required: false }
});


const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthday: { type: String, required: false },
    imageFile: { type: String, required: false },
    categories: [categorySchema]
});

export const User = mongoose.model<IUser & Document>('User', userSchema);

