import { proxy } from 'valtio';

// Mock user data
export const defaultUserData = {
    _id: '123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    userName: 'testuser',
    birthday: '1990-01-01',
    imageFile: 'http://example.com/old-image.jpg',
};

export const UserState = proxy({
    user: defaultUserData,
    isUserLoading: false,
    isUserLoggedIn: false,
});

export const setUser = jest.fn((user) => {
    UserState.user = { ...UserState.user, ...user };
});

export const setIsUserLoading = jest.fn((loading) => {
    UserState.isUserLoading = loading;
});

export const setIsUserLoggedIn = jest.fn((loggedIn) => {
    UserState.isUserLoggedIn = loggedIn;
});

// Mock UserStore
jest.mock('@/store/UserStore', () => ({
    UserState: {
        user: {
            _id: '1',
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            birthday: '1990-01-01',
        },
        isUserLoading: false,
        isUserLoggedIn: true,
    },
    setUser: jest.fn(),
}));

// Mock API calls
jest.mock('@/app/profile/api', () => ({
    updateUserData: jest.fn(() => Promise.resolve({ success: true })),
}));

jest.mock('@/store/UserAccountsStore', () => ({
    resetUserAccounts: jest.fn(),
}));

jest.mock('@/store/CategoriesStore', () => ({
    resetCategories: jest.fn(),
}));

jest.mock('@/store/TracksStore', () => ({
    resetTracks: jest.fn(),
}));
