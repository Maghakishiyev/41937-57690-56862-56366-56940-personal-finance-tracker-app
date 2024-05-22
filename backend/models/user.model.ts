import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.interface';


const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    birthday: { type: String, required: false },
    imageFile: { type: String, required: false },
    
});

export const User = mongoose.model<IUser & Document>('User', userSchema);

