import { proxy } from 'valtio';
import {
    getTracks,
    addTrack,
    updateTrack,
    deleteTrack,
} from '../app/track/api';

export interface ITrackContent {
    date: string;
    amount: string;
    type: string; // 'Income' or 'Expense'
    category?: string;
    account?: string;
    note?: string;
    from?: string;
    to?: string;
    description?: string;
}

export interface ITrack extends ITrackContent {
    _id: string;
    userId: string;
}

export interface ITrackState {
    tracks: ITrack[];
    loading: boolean;
    error: string | null;
}

export const TrackState = proxy<ITrackState>({
    tracks: [],
    loading: false,
    error: null,
});

const TrackStore = {
    TrackState,
    resetErrors: () => {
        TrackState.loading = false;
        TrackState.error = null;
    },
    resetTracks: () => {
        TrackState.tracks = [];
        TrackState.loading = false;
        TrackState.error = null;
    },
    fetchTracks: async function ({
        type,
        category,
    }: {
        type?: string;
        category?: string;
    }) {
        TrackState.loading = true;
        TrackState.error = null;
        try {
            const data = await getTracks({ category, type });
            TrackState.tracks = data; // Assuming the API returns an array of tracks
            TrackState.loading = false;
        } catch (error: any) {
            TrackState.error = error.message;
            TrackState.loading = false;
        }
    },
    addTrack: async function (track: ITrackContent) {
        TrackState.loading = true;
        TrackState.error = null;
        try {
            const addedTrack = await addTrack(track);
            TrackState.tracks.push(addedTrack); // Add the new track to the state
            TrackState.loading = false;
        } catch (error: any) {
            TrackState.error = error.message;
            TrackState.loading = false;
        }
    },
    updateTrack: async function (track: ITrack) {
        TrackState.loading = true;
        TrackState.error = null;
        try {
            const updatedTrack = await updateTrack(track);
            const index = TrackState.tracks.findIndex(
                (t) => t._id === track._id
            );
            if (index !== -1) {
                TrackState.tracks[index] = updatedTrack;
            }
            TrackState.loading = false;
        } catch (error: any) {
            TrackState.error = error.message;
            TrackState.loading = false;
        }
    },
    deleteTrack: async function (trackId: string) {
        TrackState.loading = true;
        TrackState.error = null;
        try {
            await deleteTrack(trackId);
            TrackState.tracks = TrackState.tracks.filter(
                (track) => track._id !== trackId
            );
            TrackState.loading = false;
        } catch (error: any) {
            TrackState.error = error.message;
            TrackState.loading = false;
        }
    },
};

export default TrackStore;
