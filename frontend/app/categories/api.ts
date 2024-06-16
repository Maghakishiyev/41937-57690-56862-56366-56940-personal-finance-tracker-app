import axios from 'axios';
import { ICategory, ICategoryContent } from '@/store/CategoriesStore';
import { API_BASE_URL } from '../accounts/api';

// Function to add a category to the user
export async function addCategory(category: ICategoryContent) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_BASE_URL}/categories/add`,
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
            `${API_BASE_URL}/categories/${category._id}`,
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
        const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
            `${API_BASE_URL}/categories/list/get${queryParams}`,
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
