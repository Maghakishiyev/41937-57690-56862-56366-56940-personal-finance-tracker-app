### Overview
The TrackStore is a state management solution using Valtio to manage track-related data in your application. It provides functionalities to fetch, add, update, and delete tracks, as well as to handle loading states and errors. Additionally, it fetches monthly totals for income, expenses, and savings.

### Interfaces

### ITrackContent
Represents the content of a track without its unique identifier.

export interface ITrackContent {
    date: string;
    amount: string;
    type: string; // 'Income' or 'Expense'
    category: string;
    account?: string;
    note?: string;
    from?: string;
    to?: string;
    description?: string;
}
### IMonthlyTotals
Represents the monthly totals for income, expenses, and savings.

export interface IMonthlyTotals {
    expense?: string;
    income?: string;
    savings?: string; // Assuming you calculate savings as income - expenses
}
### ITrack
Extends ITrackContent by adding _id and userId fields.

export interface ITrack extends ITrackContent {
    _id: string;
    userId: string;
}
### ITrackState
Represents the state structure for tracks, including loading and error states, and monthly totals.


export interface ITrackState {
    tracks: ITrack[];
    monthlyTotals: IMonthlyTotals;
    loading: boolean;
    error: string | null;
}
### State
The TrackState is a proxy state managed by Valtio.


export const TrackState = proxy<ITrackState>({
    tracks: [],
    monthlyTotals: {},
    loading: false,
    error: null,
});
### Store Methods

### resetErrors
Resets the loading and error states.

resetErrors: () => {
    TrackState.loading = false;
    TrackState.error = null;
},
### resetTracks
Resets the tracks array and the loading and error states.

resetTracks: () => {
    TrackState.tracks = [];
    TrackState.loading = false;
    TrackState.error = null;
},
### fetchTracks
Fetches the tracks from the API based on the provided filters and updates the state. Handles loading and error states.

fetchTracks: async function ({
    type,
    category,
    month,
    year,
}: {
    type?: string;
    category?: string;
    month?: string;
    year?: string;
}) {
    TrackState.loading = true;
    TrackState.error = null;
    try {
        const data = await getTracks({ category, type, month, year });
        TrackState.tracks = data; // Assuming the API returns an array of tracks
        TrackState.loading = false;
    } catch (error: any) {
        TrackState.error = error.message;
        TrackState.loading = false;
    }
},
### addTrack
Adds a new track to the state and handles loading and error states.

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
### updateTrack
Updates an existing track in the state and handles loading and error states.

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
### deleteTrack
Deletes a track from the state and handles loading and error states.

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
### fetchMonthlyTotals
Fetches the monthly totals for income, expenses, and savings from the API and updates the state. Handles loading and error states.

fetchMonthlyTotals: async function ({
    month,
    year,
}: {
    month: number;
    year: number;
}) {
    TrackState.loading = true;
    try {
        const totals = await getMonthlyTotals({ month, year });
        TrackState.monthlyTotals = totals;
        TrackState.loading = false;
    } catch (error: any) {
        TrackState.error = error.message;
        TrackState.loading = false;
    }
},
### Usage
To use the TrackStore in your application, import it and utilize its methods to manage track-related data. Below is an example of how to fetch tracks and display them in a React component.

import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import TrackStore from '@/store/TrackStore';

const TracksComponent: React.FC = () => {
    const { tracks, loading, error } = useSnapshot(TrackStore.TrackState);

    useEffect(() => {
        TrackStore.fetchTracks({ month: '06', year: '2024' });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Tracks</h1>
            <ul>
                {tracks.map((track) => (
                    <li key={track._id}>
                        {track.date} - {track.amount} ({track.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TracksComponent;
In this example, the TracksComponent fetches tracks when it mounts and displays them in a list. It also handles loading and error states.






