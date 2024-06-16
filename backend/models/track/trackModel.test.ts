import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Track } from './model';

describe('Track Model Test', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    it('should create and save a track record successfully', async () => {
        const trackData = {
            userId: new mongoose.Types.ObjectId(),
            date: new Date(),
            amount: '100.00',
            type: 'Expense',
            note: 'Dinner expense',
            category: 'Food',
            account: 'Credit Card',
            description: 'Dinner with family',
            from: 'Wallet',
            to: 'Restaurant',
        };
        const validTrack = new Track(trackData);
        const savedTrack = await validTrack.save();

        expect(savedTrack._id).toBeDefined();
        expect(savedTrack.userId).toEqual(trackData.userId);
        expect(savedTrack.date).toEqual(trackData.date);
        expect(savedTrack.amount).toBe(trackData.amount);
        expect(savedTrack.type).toBe(trackData.type);
        expect(savedTrack.note).toBe(trackData.note);
        expect(savedTrack.category).toBe(trackData.category);
        expect(savedTrack.account).toBe(trackData.account);
        expect(savedTrack.description).toBe(trackData.description);
        expect(savedTrack.from).toBe(trackData.from);
        expect(savedTrack.to).toBe(trackData.to);
    });

    it('should validate that required fields are provided', async () => {
        const trackData = new Track({}); // Empty object to test required validations
        let err: mongoose.Error.ValidationError | null = null;

        try {
            await trackData.save();
        } catch (error) {
            err = error as mongoose.Error.ValidationError;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        if (err) {
            expect(err.errors.userId).toBeDefined();
            expect(err.errors.date).toBeDefined();
            expect(err.errors.amount).toBeDefined();
            expect(err.errors.type).toBeDefined();
        }
    });

    it('should handle optional fields correctly', async () => {
        const trackData = {
            userId: new mongoose.Types.ObjectId(),
            date: new Date(),
            amount: '250.50',
            type: 'Income',
            // Omitting optional fields
        };
        const track = new Track(trackData);
        const savedTrack = await track.save();

        expect(savedTrack._id).toBeDefined();
        expect(savedTrack.category).toBeUndefined();
        expect(savedTrack.account).toBeUndefined();
        expect(savedTrack.note).toBeUndefined();
        expect(savedTrack.description).toBeUndefined();
        expect(savedTrack.from).toBeUndefined();
        expect(savedTrack.to).toBeUndefined();
    });
});
