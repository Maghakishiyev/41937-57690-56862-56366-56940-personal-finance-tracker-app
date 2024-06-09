// routes/track.routes.ts
import express, { Response } from 'express';
import { Track } from '../../models/track/model';
import { ReqWithUser, authCheck } from '../../middleware/authCheck';
import mongoose from 'mongoose';

const router = express.Router();

// Add a track
router.post('/add', authCheck, async (req: ReqWithUser, res: Response) => {
    const userId = req?.user?.userId;
    const trackData = { ...req.body, userId, date: new Date(req.body.date) };

    try {
        const newTrack = new Track(trackData);
        await newTrack.save();
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(500).json({ message: 'Error adding track', error });
    }
});

// Get all tracks for a user
router.get('/list', authCheck, async (req: ReqWithUser, res: Response) => {
    const userId = req?.user?.userId;
    const { type, category } = req.query; // Capture 'type', 'category', 'month', and 'year' from query parameters
    let { month, year } = req.query;

    // Ensure month and year are strings and not undefined or array types
    month = typeof month === 'string' ? month : undefined;
    year = typeof year === 'string' ? year : undefined;

    try {
        let query: any = { userId };
        if (type) {
            query.type = type;
        }
        if (category) {
            query.category = category;
        }

        if (month && year) {
            // Parse month and year into integers
            const monthNumber = parseInt(month); // Month is zero-indexed
            const yearNumber = parseInt(year);

            const startDate = new Date(yearNumber, monthNumber, 1);
            const endDate = new Date(yearNumber, monthNumber + 1, 0);

            query.date = { $gte: startDate, $lt: endDate };
        }

        const tracks = await Track.find(query);

        res.json(tracks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tracks', error });
    }
});

// Update a track
router.put('/:id', authCheck, async (req: ReqWithUser, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;

    try {
        const updatedTrack = await Track.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true }
        );
        if (!updatedTrack) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.json(updatedTrack);
    } catch (error) {
        res.status(500).json({ message: 'Error updating track', error });
    }
});

// Delete a track
router.delete('/:id', authCheck, async (req: ReqWithUser, res: Response) => {
    const { id } = req.params;
    const userId = req?.user?.userId;

    try {
        const deletedTrack = await Track.findOneAndDelete({ _id: id, userId });
        if (!deletedTrack) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.status(200).json({ message: 'Track deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting track', error });
    }
});

// Add a route to get monthly totals
router.get(
    '/monthly-totals',
    authCheck,
    async (req: ReqWithUser, res: Response) => {
        const userId = req?.user?.userId; // Assuming userId is correctly populated
        const { month, year }: any = req.query;

        const startMonth = parseInt(month, 10); // Convert month to zero-indexed integer
        const startYear = parseInt(year, 10); // Ensure year is an integer

        const startDate = new Date(startYear, startMonth, 1);
        const endDate = new Date(startYear, startMonth + 1, 0);

        try {
            const totals = await Track.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId), // Ensure userId is an ObjectId
                        date: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $group: {
                        _id: '$type',
                        total: { $sum: { $toDecimal: '$amount' } },
                    },
                },
            ]);

            const results = totals.reduce((acc, curr) => {
                acc[curr._id] = parseFloat(curr.total.toString()); // Convert Decimal128 to number
                return acc;
            }, {});

            res.json(results);
        } catch (error) {
            console.error('Error retrieving monthly totals', error);
            res.status(500).json({
                message: 'Error retrieving monthly totals',
                error,
            });
        }
    }
);

export default router;
