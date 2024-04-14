export interface SignupRequestData {
    email: string;
    password: string;
}

export interface SignupResponseData {
    message: string;
    // Add any other properties that your backend sends in the response
}