import { proxy } from 'valtio';

export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    birthday: string;
    imageFile: string;
}

export interface IUserState {
    user: IUser;
    isUserLoading: boolean;
    isUserLoggedIn: boolean;
}

export const AccountState = proxy<IUserState>({
    user: {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        imageFile: '',
        birthday: '',
    },
    isUserLoading: false,
    isUserLoggedIn: false,
});

export const setUser = (user: IUser) => {
    AccountState.user = user;
};

export const setIsUserLoading = (loading: boolean) => {
    AccountState.isUserLoading = loading;
};

export const setIsUserLoggedIn = (leggedIn: boolean) => {
    AccountState.isUserLoggedIn = leggedIn;
};