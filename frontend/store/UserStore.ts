import { proxy } from 'valtio';

export interface ICategories {
    _id: string;
    categoryName: string,
    categoryIcon: string,
    categoryType: string,
    categoryDes?: string
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
}

export interface IUserState {
    user: IUser;
    isUserLoading: boolean;
    isUserLoggedIn: boolean;
    showEditCategoriesModal: boolean;
    editCategory: ICategories[];
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
        categories: []
    },
    isUserLoading: false,
    isUserLoggedIn: false,
    showEditCategoriesModal: false,
    editCategory: []
});

export const setUser = (user: IUser) => {
    AccountState.user = user;
};

export const setUserCategories = (categories: ICategories) => {
    console.log("store category", categories);
    AccountState.user.categories.push(categories)
    console.log("account state: ", AccountState);

}

export const setIsUserLoading = (loading: boolean) => {
    AccountState.isUserLoading = loading;
};

export const setIsUserLoggedIn = (leggedIn: boolean) => {
    AccountState.isUserLoggedIn = leggedIn;
};

export const setShowEditCategoriesModal = (show: boolean, categories: ICategories) => {
    AccountState.isUserLoggedIn = show;
    AccountState.editCategory.push(categories)
};