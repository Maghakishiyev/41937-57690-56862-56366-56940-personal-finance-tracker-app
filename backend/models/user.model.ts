import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.interface';

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // AWe can add other user properties and their schema types here
    profileName: { type: String, required: false },
    firstname: { type: String, required: false },
    lastName: { type: String, required: false },
    birthDay: { type: Date, required: false },
});

export const User = mongoose.model<IUser & Document>('User', userSchema);
