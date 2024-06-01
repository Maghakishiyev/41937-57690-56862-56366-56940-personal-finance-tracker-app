import { proxy } from 'valtio';

export interface ITrack {
    _id: string;
    account?: string;
    amount: string;
    category?: string;
    date: string;
    description?: string;
    note?: string;
    from?: string;
    to?: string;
    type: string;
}

export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    birthday: string;
    imageFile: string;
    track: ITrack[];
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
        imageFile: '',
        birthday: '',
        track: [],
    },
    isUserLoading: false,
    isUserLoggedIn: false,
});

export const AccountState = proxy<IUserState>({
    user: {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        imageFile: '',
        birthday: '',
        track: [],
    },
    isUserLoading: false,
    isUserLoggedIn: false,
});

export const setUser = (user: IUser) => {
    AccountState.user = user;
};

export const setUserTracks = (track: ITrack) => {
    AccountState.user.track.push(track);
};

export const setIsUserLoading = (loading: boolean) => {
    AccountState.isUserLoading = loading;
};

export const setIsUserLoggedIn = (leggedIn: boolean) => {
    AccountState.isUserLoggedIn = leggedIn;
};
