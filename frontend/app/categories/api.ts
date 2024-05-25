import axios from "axios";
import { ICategories } from "@/store/UserStore";

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual backend base URL

export async function addCategoryToUser(category: ICategories, userId: string) {
    console.log('userId', userId);
    console.log('category', category);
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_BASE_URL}/addCategory/${userId}`, category, {
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