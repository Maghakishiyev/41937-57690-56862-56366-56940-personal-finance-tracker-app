import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './index';
import { authCheck } from '../../middleware/authCheck'; // Import the middleware
import mongoose from 'mongoose';

// Mock middleware
jest.mock('../../middleware/authCheck', () => ({
    authCheck: jest.fn((req, res, next) => next()), // Always call next() to simulate successful auth
}));

const app = express();
app.use(bodyParser.json());
app.use('/accounts', accountRoutes);

// Ensure that model methods are still mocked as before
jest.mock('../../models/account/model', () => ({
    Account: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

describe('POST /add', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new account when no duplicates exist', async () => {
        const mockId = new mongoose.Types.ObjectId();
        require('../../models/account/model').Account.findOne.mockResolvedValue(
            null
        );
        require('../../models/account/model').Account.create.mockResolvedValue({
            _id: mockId,
            name: 'Savings',
            emoji: '💰',
            description: 'My savings account',
        });

        const response = await request(app)
            .post('/accounts/add')
            .send({
                name: 'Savings',
                emoji: '💰',
                description: 'My savings account',
            })
            .set('Authorization', 'Bearer valid.token.here');

        if (response.status === 500) {
            console.error('Server Error:', response.body);
        }
    });

    it('should return 409 if account already exists', async () => {
        require('../../models/account/model').Account.findOne.mockResolvedValue(
            {
                name: 'Savings',
                emoji: '💰',
            }
        );

        const response = await request(app)
            .post('/accounts/add')
            .send({
                name: 'Savings',
                emoji: '💰',
                description: 'My savings account',
            })
            .set('Authorization', 'Bearer valid.token.here');

        expect(response.status).toBe(409);
        expect(response.body.message).toContain('already exists');
    });
});
