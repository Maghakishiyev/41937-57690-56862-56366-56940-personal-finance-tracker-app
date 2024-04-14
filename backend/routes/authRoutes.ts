import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/hashPassword';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || '-|your@_@default@_@secret|-';

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ user: { email: user.email, id: user._id } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user', error });
    }
});

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
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
        res.json({ user: { email: user.email, id: user._id }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
