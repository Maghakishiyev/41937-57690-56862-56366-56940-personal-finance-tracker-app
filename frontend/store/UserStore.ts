import { proxy } from 'valtio';

export interface IUser {
    id: string;
    email: string;
    profileName?: string;
    firstname?: string;
    lastName?: string;
    birthDay?: string;
}

export interface IUserState {
    user: IUser;
    isUserLoading: boolean;
    isUserLoggedIn: boolean;
}

export const AccountState = proxy<IUserState>({
    user: { email: '', id: '' },
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
