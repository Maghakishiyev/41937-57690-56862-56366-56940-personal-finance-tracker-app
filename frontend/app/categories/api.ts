import axios from 'axios';
import { ICategory, ICategoryContent } from '@/store/CategoriesStore';

const API_BASE_URL = 'http://localhost:8080/api/categories'; // Adjusted for category routes

// Function to add a category to the user
export async function addCategory(category: ICategoryContent) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_BASE_URL}/add`, category, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during adding category.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}

// Function to edit a category
export async function updateCategory(category: ICategory) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `${API_BASE_URL}/${category._id}`,
            category,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during updating category.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}

// Function to delete a category
export async function deleteCategory(categoryId: string) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
            `${API_BASE_URL}/${categoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during deleting category.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}

export async function getCategories(type?: string) {
    try {
        const token = localStorage.getItem('token');
        const queryParams = type ? `?type=${type}` : ''; // Append type to URL if provided
        const response = await axios.get(
            `${API_BASE_URL}/list/get${queryParams}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during fetching categories.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}
