import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Account } from './model';
import { ValidationError } from 'aws-sdk/clients/datapipeline';

describe('Account Model Test', () => {
    let mongoServer: MongoMemoryServer;

    // Setup the in-memory MongoDB server before all tests
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    // Clean up the database after each test case
    afterEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    // Disconnect Mongoose and stop the in-memory MongoDB server after all tests are done
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('create & save account successfully', async () => {
        const accountData = {
            userId: new mongoose.Types.ObjectId(),
            name: 'Savings',
            emoji: '💰',
            description: 'Savings account',
        };
        const validAccount = new Account(accountData);
        const savedAccount = await validAccount.save();

        expect(savedAccount._id).toBeDefined();
        expect(savedAccount.userId).toEqual(accountData.userId);
        expect(savedAccount.name).toBe(accountData.name);
        expect(savedAccount.emoji).toBe(accountData.emoji);
        expect(savedAccount.description).toBe(accountData.description);
    });

    it('throws validation errors when required fields are missing', async () => {
        const accountData = new Account({ name: 'Checking' }); // Missing required userId and emoji
        let err: ValidationError | null = null;
        try {
            await accountData.save();
        } catch (error) {
            err = error as ValidationError;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        if (err instanceof mongoose.Error.ValidationError) {
            expect(err.errors.userId).toBeDefined();
            expect(err.errors.emoji).toBeDefined();
        } else {
            // Fail the test if the error is not an instance of ValidationError
            fail('Expected mongoose.ValidationError');
        }
    });
});
