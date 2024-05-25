interface ICategory {
    _id: string;
    categoryName: string;
    categoryIcon: string;
    categoryType: string;
    categoryDescription?: string;
}

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    birthday: string;
    imageFile: string;
    password: string
    categories: ICategory[]
}
