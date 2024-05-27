import { proxy } from 'valtio';

export interface ICategories {
    _id: string;
    categoryName: string,
    categoryIcon: string,
    categoryType: string,
    categoryDes?: string
}

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
    categories: ICategories[];
    track: ITrack[]
}

export interface IUserState {
    user: IUser;
    isUserLoading: boolean;
    isUserLoggedIn: boolean;
    dataEditCategoriesModal: ICategories;
    showEditCategoriesModal: boolean;
    dataDeleteCategoriesModal: string;
    showDeleteCategoriesModal: boolean;

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
        categories: [],
        track: []
    },
    isUserLoading: false,
    isUserLoggedIn: false,
    dataEditCategoriesModal: {
        _id: "",
        categoryName: "",
        categoryIcon: "",
        categoryType: "",
        categoryDes: ""
    },
    showEditCategoriesModal: false,
    dataDeleteCategoriesModal: "",
    showDeleteCategoriesModal: false,
});

export const setUser = (user: IUser) => {
    AccountState.user = user;
};

export const setUserCategories = (categories: ICategories) => {
    AccountState.user.categories.push(categories)
}

export const setUserTracks = (track: ITrack) => {
    AccountState.user.track.push(track)
}

export const setIsUserLoading = (loading: boolean) => {
    AccountState.isUserLoading = loading;
};

export const setIsUserLoggedIn = (leggedIn: boolean) => {
    AccountState.isUserLoggedIn = leggedIn;
};

export const setDataEditCategoriesModal = (category: ICategories) => {
    // console.log(category);
    AccountState.dataEditCategoriesModal = category
}

export const setShowEditCategoriesModal = (show: boolean) => {
    AccountState.showEditCategoriesModal = show
}

export const setDataDeleteCategoriesModal = (category: string) => {
    // console.log(category);
    AccountState.dataDeleteCategoriesModal = category
}

export const setShowDeleteCategoriesModal = (show: boolean) => {
    AccountState.showDeleteCategoriesModal = show
}