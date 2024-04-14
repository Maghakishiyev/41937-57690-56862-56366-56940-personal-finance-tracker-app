import { IUser } from '@/store/UserStore';

export interface SignupRequestData {
    email: string;
    password: string;
}

export interface SignupResponseData {
    user: IUser;
    token: string;
}
