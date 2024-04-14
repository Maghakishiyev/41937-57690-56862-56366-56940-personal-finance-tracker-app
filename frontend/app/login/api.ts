import axios from "axios";
import { SigninRequestData, SigninResponseData } from "./types";

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual backend base URL

export async function signIn(userData: SigninRequestData): Promise<SigninResponseData> {
    try {
        const response = await axios.post<SigninResponseData>(`${API_BASE_URL}/signin`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'An error occurred during signup.');
        }
        throw new Error('An unknown error occurred');
    }
}