import axios from 'axios';
import { ITrack, ITrackContent } from '@/store/TracksStore';

const API_BASE_URL = 'http://localhost:8080/api/tracks'; // Replace with your actual backend base URL

type TGetTracksProsps = {
    type?: string;
    category?: string;
    month?: string;
    year?: string;
};

export const getTracks = async ({
    type,
    category,
    month,
    year,
}: TGetTracksProsps) => {
    try {
        const params = new URLSearchParams();
        const token = localStorage.getItem('token');

        if (type) params.append('type', type);
        if (category) params.append('category', category);
        if (month) params.append('month', month.toString());
        if (year) params.append('year', year.toString());

        const response = await axios.get(`${API_BASE_URL}/list`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Assuming the server sends back an array of tracks
    } catch (error) {
        console.error('Failed to fetch tracks:', error);
        throw error; // Re-throw the error for handling it in the UI layer
    }
};

export const addTrack = async (track: ITrackContent) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${API_BASE_URL}/add`, track, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the server sends back the added track
    } catch (error) {
        console.error('Failed to add track:', error);
        throw error;
    }
};

export const updateTrack = async (track: ITrack) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(
            `${API_BASE_URL}/${track._id}`,
            track,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Assuming the server sends back the updated track
    } catch (error) {
        console.error('Failed to update track:', error);
        throw error;
    }
};

export const deleteTrack = async (trackId: string) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(
            `${API_BASE_URL}/${trackId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Assuming the server sends back some confirmation
    } catch (error) {
        console.error('Failed to delete track:', error);
        throw error;
    }
};

export const getMonthlyTotals = async ({
    month,
    year,
}: {
    month: number;
    year: number;
}) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_BASE_URL}/monthly-totals`, {
            params: { month, year },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch monthly totals:', error);
        throw error;
    }
};
