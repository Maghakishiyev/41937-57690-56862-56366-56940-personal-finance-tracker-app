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
    type?: string;
}

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    birthday: string;
    imageFile: string;
    password: string;
    tracks: ITrack[];
}
