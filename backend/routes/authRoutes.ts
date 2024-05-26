import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/hashPassword';
import { authCheck } from '../middleware'
import config from '../configs';
import { getDefaultCategories } from '../src/defaultCategories';

const router = express.Router();

const JWT_SECRET = config.jwt_secret;

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
            categories: getDefaultCategories()
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log("user", user);

        res.status(201).json({ user: { ...user }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user', error });
    }
});

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log('user', user);
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
        res.json({ user: { ...user }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put(`/user/:id`, authCheck, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName, userName, birthday, imageFile } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            email,
            firstName,
            lastName,
            userName,
            birthday,
            imageFile
        }, { new: true, runValidators: true, overwrite: true }); // Ensure the entire document is replaced



        if (!updatedUser) {
            return res.status(404).send('User not found.');
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post(`/addCategory/:id`, authCheck, async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("req.body", req.body)
    try {
        const user = await User.findById(id)
        if (!user) { return res.status(404).send('User not found'); }

        user.categories.push(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send('Server error');
    }
})


export default router;


