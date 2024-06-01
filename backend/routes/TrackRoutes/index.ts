// routes/track.routes.ts
import express, { Response } from 'express';
import { Track } from '../../models/track/model';
import { ReqWithUser, authCheck } from '../../middleware/authCheck';

const router = express.Router();

// Add a track
router.post('/add', authCheck, async (req: ReqWithUser, res: Response) => {
    const userId = req?.user?.userId;
    const trackData = { ...req.body, userId };

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
    const { type, category } = req.query; // Capture 'type' and 'category' from query parameters

    try {
        let query: any = { userId };

        if (type) {
            query.type = type; // Filter by type if specified
        }
        if (category) {
            query.category = category; // Filter by category if specified
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

export default router;
