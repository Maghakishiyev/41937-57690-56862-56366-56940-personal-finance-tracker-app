jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/'), // Adjust the return value based on your test needs
    useRouter: jest.fn(() => ({
        replace: jest.fn(),
        // Include other router methods you use in the component:
        // push, prefetch, etc.
    })),
}));
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header'; // Adjust the import path as necessary
import { setUser, setIsUserLoggedIn } from '@/store/UserStore';
import { usePathname, useRouter } from 'next/navigation';
import { defaultUserData } from '@/store/userStoreMocks';

// Assuming mocks are correctly set up now
describe('Header Component', () => {
    beforeEach(() => {
        // Resetting and providing return values for mocks
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn(),
            pathname: '/',
        });
        (usePathname as jest.Mock).mockReturnValue('/');
        jest.clearAllMocks();

        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                removeItem: jest.fn(),
                getItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });
    });

    it('renders sign-in and sign-up links when user is not logged in', () => {
        render(<Header />);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    });

    it('renders user information and sign-out button when user is logged in', () => {
        setIsUserLoggedIn(true);
        setUser(defaultUserData);
        render(<Header />);
        expect(screen.getByText('testuser')).toBeInTheDocument();
        expect(screen.getByText('Sign out')).toBeInTheDocument();
        expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    });

    it('calls signOutClickHandler and logs the user out', () => {
        setIsUserLoggedIn(true);
        render(<Header />);
        fireEvent.click(screen.getByText('Sign out'));

        expect(window.localStorage.removeItem).toHaveBeenCalledWith('token');
    });
});
