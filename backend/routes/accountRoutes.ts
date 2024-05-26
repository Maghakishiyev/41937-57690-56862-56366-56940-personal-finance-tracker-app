// routes/account.routes.ts
import express, { Request, Response } from 'express';
import { Account } from '../models/account.model';
import { ReqWithUser, authCheck } from '../middleware/authCheck';

const router = express.Router();

// Add a new account
router.post('/add', authCheck, async (req: ReqWithUser, res: Response) => {
    const { name, emoji, description } = req.body;

    const userId = req?.user?.userId; // Assumed to be set by the auth middleware

    const existingAccount = await Account.findOne({ userId, name, emoji });
    if (existingAccount) {
        return res.status(409).json({
            message: 'An account with the same name and emoji already exists.',
        });
    }

    try {
        const newAccount = new Account({
            userId,
            name,
            emoji,
            description,
        });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error adding account', error });
    }
});

// List all accounts for the authenticated user
router.get('/list/get', authCheck, async (req: ReqWithUser, res: Response) => {
    const userId = req?.user?.userId; // Assumed to be set by the auth middleware

    try {
        const accounts = await Account.find({ userId });
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving accounts', error });
    }
});

// Update an account
router.put(
    '/update/:accountId',
    authCheck,
    async (req: ReqWithUser, res: Response) => {
        const userId = req?.user?.userId;
        const { accountId } = req.params;
        const { name, emoji, description } = req.body;

        try {
            const existingAccount = await Account.findOne({
                userId,
                name,
                emoji,
                description
            });
            if (existingAccount) {
                return res.status(409).json({
                    message:
                        'An account with the same name and emoji already exists.',
                });
            }

            const updatedAccount = await Account.findByIdAndUpdate(
                accountId,
                {
                    name,
                    emoji,
                    description,
                },
                { new: true }
            );

            if (!updatedAccount) {
                return res.status(404).json({ message: 'Account not found' });
            }

            res.json(updatedAccount);
        } catch (error) {
            res.status(500).json({ message: 'Error updating account', error });
        }
    }
);

// Delete an account
router.delete(
    '/delete/:accountId',
    authCheck,
    async (req: ReqWithUser, res: Response) => {
        const { accountId } = req.params;

        try {
            const deletedAccount = await Account.findByIdAndDelete(accountId);
            if (!deletedAccount) {
                return res.status(404).json({ message: 'Account not found' });
            }
            res.status(200).json({ message: 'Account deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting account', error });
        }
    }
);

export default router;
