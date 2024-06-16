import axios from 'axios';
import { SigninRequestData, SigninResponseData } from './types';
import { API_BASE_URL } from '../accounts/api';

export async function signIn(
    userData: SigninRequestData
): Promise<SigninResponseData> {
    try {
        const response = await axios.post<SigninResponseData>(
            `${API_BASE_URL}/auth/signin`,
            userData
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data.message ||
                    'An error occurred during signup.'
            );
        }
        throw new Error('An unknown error occurred');
    }
}
