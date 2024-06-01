import { Document } from 'mongoose';

export interface ITrack extends Document {
    userId: string; // Reference to the User's ObjectId
    date: string; // Date string for the track
    amount: string; // Amount involved in the track
    type: string; // Type, typically 'Expense' or 'Income'
    category?: string; // Optional category of the track
    account?: string; // Optional account associated with the track
    note?: string; // Optional note for additional details
    from?: string; // Optional field for transfers (source)
    to?: string; // Optional field for transfers (destination)
    description?: string; // Optional description of the track
}
