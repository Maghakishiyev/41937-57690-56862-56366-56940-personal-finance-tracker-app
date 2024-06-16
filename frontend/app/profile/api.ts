import axios from 'axios';
import { IUser } from '@/store/UserStore';
import { API_BASE_URL } from '../accounts/api';

export async function updateUserData(userId: string, userData: IUser) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(
            `${API_BASE_URL}/auth/user/${userId}`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // Optionally return the data
    } catch (error: any) {
        console.error(
            'Error updating user:',
            error.response ? error.response.data : error.message
        );
        throw error;
    }
}
