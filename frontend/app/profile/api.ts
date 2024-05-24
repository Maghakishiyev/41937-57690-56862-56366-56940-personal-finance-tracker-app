import axios from "axios";
import { IUser } from "@/store/UserStore";

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual backend base URL


export async function updateUserData(userId: string, userData: IUser) {
    console.log(userId, userData);
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`${API_BASE_URL}/user/${userId}`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('User data updated successfully:', response.data);
        return response.data; // Optionally return the data
    } catch (error: any) {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
        throw error;
    }
}