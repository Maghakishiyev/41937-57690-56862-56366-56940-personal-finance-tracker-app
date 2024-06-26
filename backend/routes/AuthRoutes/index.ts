import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../../models/user/model';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../../utils/hashPassword';
import { authCheck } from '../../middleware';
import config from '../../configs';
import { DEFAULT_CATEGORIES } from './defaultCategories';
import { Category } from '../../models/categories/model';
import { DEFAULT_ACCOUNTS } from '../../src/getDefaultAccounts';
import { Account } from '../../models/account/model';

const router = express.Router();

const JWT_SECRET = config.jwt_secret;

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Received request', email, password);
    try {
        
        const user = await User.findOne({ email });
        console.log("User is", user);
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        const { password: _removed, ...userWithoutPassword } = user?.toObject();

        res.json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
        });

        await user.save(); // Save the user first

        // Initialize default categories with userId
        const defaultCategories = DEFAULT_CATEGORIES.map((cat) => ({
            ...cat,
            userId: user._id, // Associate categories with the user
        }));

        // Save default categories
        await Category.insertMany(defaultCategories);

        // Handle default accounts
        const defaultAccounts = DEFAULT_ACCOUNTS.map((account) => ({
            userId: user._id,
            ...account,
        }));
        await Account.insertMany(defaultAccounts);

        // Generate a token and return the response
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        const { password: _removed, ...userWithoutPassword } = user?.toObject();

        res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user', error });
    }
});

router.put(`/user/:id`, authCheck, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName, userName, birthday, imageFile } =
        req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                email,
                firstName,
                lastName,
                userName,
                birthday,
                imageFile,
            },
            { new: true, runValidators: true, overwrite: true }
        ); // Ensure the entire document is replaced

        if (!updatedUser) {
            return res.status(404).send('User not found.');
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
