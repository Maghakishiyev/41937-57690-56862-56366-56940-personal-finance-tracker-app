import express, { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/hashPassword';
import { authCheck } from '../middleware';
import config from '../configs';
import { getDefaultCategories } from '../src/defaultCategories';
import { ICategory } from '../models/user.interface';
import { DEFAULT_ACCOUNTS } from '../src/getDefaultAccounts';
import { Account } from '../models/account.model';

const router = express.Router();

const JWT_SECRET = config.jwt_secret;

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
            categories: getDefaultCategories(),
            tracks: [],
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        const defaultAccounts = DEFAULT_ACCOUNTS.map((account) => ({
            userId: user._id,
            ...account,
        }));

        await Account.insertMany(defaultAccounts);

        res.status(201).json({ user: { ...user }, token });
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
        res.json({ user: { ...user }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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

router.post(
    `/addCategory/:id`,
    authCheck,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send('User not found');
            }

            user.categories.push(req.body);
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            console.error('Error adding category:', error);
            res.status(500).send('Server error');
        }
    }
);

router.put(`/user/:userId/category/:categoryId`, authCheck, async (req: Request, res: Response) => {
    const { userId, categoryId } = req.params;
    const updateData = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) { return res.status(404).send('User not found'); }

        const categories = user.categories;
        const category: any = []

        categories.map((item) => item._id == categoryId && category.push(item))
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category[0].categoryName = updateData.categoryName || category.categoryName;
        category[0].categoryIcon = updateData.categoryIcon || category.categoryIcon;
        category[0].categoryType = updateData.categoryType || category.categoryType;
        category[0].categoryDes = updateData.categoryDes || category.categoryDes;

        await user.save();
        res.send(user);
    } catch (error) {
        console.error('Server error while updating category:', error);
        res.status(500).json({ message: 'Server error while updating category' });
    }

})

router.delete(`/user/:userId/category/:categoryId`, authCheck, async (req: Request, res: Response) => {
    const { userId, categoryId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const originalLength = user.categories.length;
        user.categories = user.categories.filter(category => category._id.toString() !== categoryId);

        if (user.categories.length === originalLength) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await user.save();
        res.send(user);
    } catch (error) {
        console.error('Server error while deleting category:', error);
        res.status(500).json({ message: 'Server error while deleting category' });
    }

})

router.post(`/addTrack/:id`, authCheck, async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = { ...req.body };
    console.log("data", data);

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.tracks) {
            user.tracks = [];
        }

        user.tracks.push(data);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error adding track:', error);
        res.status(500).send('Server error');
    }
});

export default router;
