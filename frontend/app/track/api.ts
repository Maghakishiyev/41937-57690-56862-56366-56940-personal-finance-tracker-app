import axios from "axios";
import { ITrack } from "@/store/UserStore";

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual backend base URL

export async function addTrackToUser(track: ITrack, userId: string) {

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_BASE_URL}/addTrack/${userId}`, track, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'An error occurred during saving category.');
        }
        throw new Error('An unknown error occurred');
    }
}