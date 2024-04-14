import { IUser } from '@/store/UserStore';

export interface SigninRequestData {
    email: string;
    password: string;
}

export interface SigninResponseData {
    user: IUser;
    token: string
}