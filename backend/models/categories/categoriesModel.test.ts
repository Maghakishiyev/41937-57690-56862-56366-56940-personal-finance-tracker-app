import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Category } from './model';

describe('Category Model Test', () => {
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

    it('should create and save a category successfully', async () => {
        const categoryData = {
            name: 'Entertainment',
            icon: '🎬',
            type: 'Expense',
            description: 'Expenses on entertainment and leisure',
            userId: new mongoose.Types.ObjectId(),
        };
        const validCategory = new Category(categoryData);
        const savedCategory = await validCategory.save();

        expect(savedCategory._id).toBeDefined();
        expect(savedCategory.name).toBe(categoryData.name);
        expect(savedCategory.icon).toBe(categoryData.icon);
        expect(savedCategory.type).toBe(categoryData.type);
        expect(savedCategory.description).toBe(categoryData.description);
        expect(savedCategory.userId).toEqual(categoryData.userId);
    });

    it('should validate that required fields are provided', async () => {
        const categoryData = new Category({
            description: 'Only description is provided',
        });
        let err: mongoose.Error.ValidationError | null = null;

        try {
            await categoryData.save();
        } catch (error) {
            err = error as mongoose.Error.ValidationError;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        if (err) {
            expect(err.errors.name).toBeDefined();
            expect(err.errors.icon).toBeDefined();
            expect(err.errors.type).toBeDefined();
            expect(err.errors.userId).toBeDefined();
        }
    });
});
