// routes/category.routes.ts
import express, { Request, Response } from 'express';
import { Category } from '../../models/categories/model';
import { ReqWithUser, authCheck } from '../../middleware/authCheck';

const router = express.Router();

// List all categories for the authenticated user
router.get('/list/get', authCheck, async (req: ReqWithUser, res: Response) => {
    const userId = req?.user?.userId;
    const { type } = req.query; // Capture the 'type' query parameter

    try {
        const query: any = { userId };
        if (type) {
            query.type = type; // Add type to query if it's specified
        }

        const categories = await Category.find(query);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
});
// Get a category by ID
router.get('/:id/get', authCheck, async (req: ReqWithUser, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;
    try {
        const category = await Category.findOne({ _id: id, userId });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving category', error });
    }
});

// Update a category
router.put('/:id', authCheck, async (req: ReqWithUser, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;
    const { name, icon, description, type } = req.body;

    try {
        // Check for an existing category with the same name and type that isn't the current one
        const existingCategory = await Category.findOne({
            userId,
            name,
            type,
            description,
        });

        if (existingCategory) {
            return res.status(409).json({
                message:
                    'Another category with the same name and type already exists',
            });
        }

        // Proceed to update the category if no duplicates were found
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id, userId },
            { name, icon, description, type },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
});
// Delete a category
router.delete('/:id', authCheck, async (req: ReqWithUser, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;

    try {
        const deletedCategory = await Category.findOneAndDelete({
            _id: id,
            userId,
        });
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});

router.post('/add', authCheck, async (req: ReqWithUser, res: Response) => {
    const userId = req?.user?.userId;
    const { name, icon, type, description } = req.body;

    try {
        // Check if category already exists with the same name and type under the same user
        const existingCategory = await Category.findOne({
            userId,
            name,
            type,
            description,
        });
        if (existingCategory) {
            return res.status(409).json({
                message: 'Category with the same name and type already exists',
            });
        }

        // Create a new category object
        const newCategory = new Category({
            userId,
            name,
            icon,
            type,
            description,
        });

        // Save the new category
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error });
    }
});

export default router;
