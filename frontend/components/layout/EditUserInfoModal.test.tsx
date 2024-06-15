import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditUserInfoModal from './EditUserInfoModal';
import { setUser, UserState } from '@/store/UserStore';
import { updateUserData } from '@/app/profile/api';

describe('EditUserInfoModal', () => {
    const mockSetOpen = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when open', () => {
        render(<EditUserInfoModal open={true} setOpen={mockSetOpen} />);
        expect(screen.queryByRole('presentation')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(<EditUserInfoModal open={false} setOpen={mockSetOpen} />);
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('closes the modal on close', async () => {
        render(<EditUserInfoModal open={true} setOpen={mockSetOpen} />);
        const root = screen.getByRole('presentation');
        const firstElement = root.firstElementChild;
        userEvent.click(firstElement as Element);

        await waitFor(() => expect(mockSetOpen).toHaveBeenCalledWith(false));
    });
});
