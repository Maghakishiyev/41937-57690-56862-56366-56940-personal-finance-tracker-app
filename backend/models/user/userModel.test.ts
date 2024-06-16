import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from './model'; // Adjust the path based on your project structure
import { MongoError } from 'mongodb';

describe('User Model Test', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        await User.init();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    it('should create and save a user successfully', async () => {
        const userData = {
            email: 'testuser@example.com',
            password: '123456',
            userName: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            birthday: '1990-01-01',
            imageFile: 'path/to/image.jpg',
        };
        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.userName).toBe(userData.userName);
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
        expect(savedUser.birthday).toBe(userData.birthday);
        expect(savedUser.imageFile).toBe(userData.imageFile);
    });

    it('should fail if required fields are missing', async () => {
        const user = new User({});
        let err: mongoose.Error.ValidationError | null = null;

        try {
            await user.save();
        } catch (error) {
            err = error as mongoose.Error.ValidationError;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err?.errors.email).toBeDefined();
        expect(err?.errors.password).toBeDefined();
    });

    it('should handle optional fields correctly', async () => {
        const userData = {
            email: 'useroptional@example.com',
            password: 'secure123',
        };
        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.userName).toBeUndefined();
        expect(savedUser.firstName).toBeUndefined();
        expect(savedUser.lastName).toBeUndefined();
        expect(savedUser.birthday).toBeUndefined();
        expect(savedUser.imageFile).toBeUndefined();
    });
});
