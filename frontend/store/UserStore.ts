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

export const UserState = proxy<IUserState>({
    user: {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        birthday: '',
        imageFile: '',
    },
    isUserLoading: false,
    isUserLoggedIn: false,
});

export const setUser = (user: IUser) => {
    UserState.user = user;
};

export const setIsUserLoading = (loading: boolean) => {
    UserState.isUserLoading = loading;
};

export const setIsUserLoggedIn = (loggedIn: boolean) => {
    UserState.isUserLoggedIn = loggedIn;
};
