import axios from "axios";
import { SignupRequestData, SignupResponseData } from "./types";

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual backend base URL

export async function signUp(userData: SignupRequestData): Promise<SignupResponseData> {
    try {
        const response = await axios.post<SignupResponseData>(`${API_BASE_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || 'An error occurred during signup.');
        }
        throw new Error('An unknown error occurred');
    }
}