import { render, screen, fireEvent } from '@testing-library/react';
import { useSnapshot } from 'valtio';
import { ProfileInfoContainer } from './index';
import '@testing-library/jest-dom';

// Mock the useSnapshot hook from valtio
jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

// Mock the EditUserInfoModal component
jest.mock('@/components/layout/EditUserInfoModal', () => (props: any) => (
    <div data-testid='edit-user-info-modal' {...props}>
        EditUserInfoModal
    </div>
));

jest.mock('@/store/UserStore', () => ({
    UserState: {
        user: {
            _id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            birthday: '1990-01-01',
            imageFile: 'http://example.com/image.jpg',
        },
        isUserLoading: false,
        isUserLoggedIn: true,
    },
    setUser: jest.fn(),
    setIsUserLoading: jest.fn(),
    setIsUserLoggedIn: jest.fn(),
}));

describe('ProfileInfoContainer', () => {
    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation(() => ({
            user: {
                _id: '1',
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                userName: 'johndoe',
                birthday: '1990-01-01',
                imageFile: 'http://example.com/image.jpg',
            },
            isUserLoading: false,
            isUserLoggedIn: true,
            error: null,
            loading: false,
        }));
    });

    it('renders user information correctly', () => {
        render(<ProfileInfoContainer />);

        // Check for user name
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        // Check for user email
        expect(screen.getByText('test@example.com')).toBeInTheDocument();

        // Check for user info fields
        expect(screen.getByText('User Name: johndoe')).toBeInTheDocument();
        expect(screen.getByText('Birthday: 1990-01-01')).toBeInTheDocument();
    });

    it('renders the avatar correctly', () => {
        render(<ProfileInfoContainer />);
        const avatar = screen.getByAltText('Profile Avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'http://example.com/image.jpg');
    });
});
