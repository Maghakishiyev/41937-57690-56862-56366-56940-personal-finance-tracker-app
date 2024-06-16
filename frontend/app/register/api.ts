import axios from 'axios';
import { SignupRequestData, SignupResponseData } from './types';
import { API_BASE_URL } from '../accounts/api';

export async function signUp(
    userData: SignupRequestData
): Promise<SignupResponseData> {
    try {
        const response = await axios.post<SignupResponseData>(
            `${API_BASE_URL}/auth/signup`,
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
