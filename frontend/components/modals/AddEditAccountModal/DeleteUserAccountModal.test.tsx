import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteUserAccountModal from './DeleteUserAccountModal';
import UserAccountsStore from '@/store/UserAccountsStore';
import { useSnapshot } from 'valtio';
import { IUserAccount } from '@/store/UserAccountsStore';

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/UserAccountsStore', () => ({
    deleteAccount: jest.fn(),
    resetErrors: jest.fn(),
    UserAccountsState: { error: null },
}));

describe('DeleteUserAccountModal', () => {
    const mockSetOpen = jest.fn();
    const mockSetSelectedAccount = jest.fn();
    const mockAccount: IUserAccount = {
        _id: '1',
        userId: '23',
        name: 'Test Account',
        emoji: '😀',
        description: 'Test Description',
    };

    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation(() => ({
            error: null,
        }));
        jest.clearAllMocks();
    });

    it('renders the modal correctly when open', () => {
        render(
            <DeleteUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={mockAccount}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        expect(screen.getByText('Delete Account')).toBeInTheDocument();
        expect(
            screen.getByText('Are you sure you want to delete this account?')
        ).toBeInTheDocument();
        expect(screen.getByText('Test Account')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('calls deleteAccount on confirm', async () => {
        render(
            <DeleteUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={mockAccount}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.click(screen.getByText('Confirm'));

        await waitFor(() => {
            expect(UserAccountsStore.deleteAccount).toHaveBeenCalledWith(
                mockAccount
            );
        });

        expect(mockSetOpen).toHaveBeenCalledWith(false);
        expect(mockSetSelectedAccount).toHaveBeenCalledWith(undefined);
    });

    it('handles closing the modal', () => {
        render(
            <DeleteUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={mockAccount}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockSetOpen).toHaveBeenCalledWith(false);
        expect(mockSetSelectedAccount).toHaveBeenCalledWith(undefined);
    });
});
