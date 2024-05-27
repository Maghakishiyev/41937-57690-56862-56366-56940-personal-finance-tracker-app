import axios from 'axios';
import { IUserAccount, IUserAccountContent } from '@/store/UserAccountsStore';

const API_BASE_URL = 'http://localhost:8080/api/'; // Replace with your actual backend base URL

export async function addAccountToUser(account: IUserAccountContent) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('accounts/add', account, {
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during saving account.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}

export async function getUserAccounts() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/accounts/list/get', {
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during getting accounts.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}

export async function updateUserAccount(account: IUserAccount) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `/accounts/update/${account._id}`,
            account,
            {
                baseURL: API_BASE_URL,
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
                    'An error occurred during updating account.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}

export async function deleteUserAccount(account: IUserAccount) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.delete(`/accounts/delete/${account._id}`, {
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const message =
                error.response.data.message ||
                'An error occurred during the account deletion.';
            throw new Error(message);
        }
        throw new Error('An unknown error occurred');
    }
}
