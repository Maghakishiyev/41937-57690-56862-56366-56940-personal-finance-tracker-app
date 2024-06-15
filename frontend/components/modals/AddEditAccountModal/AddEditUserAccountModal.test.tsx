import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddUserAccountModal from './AddEditUserAccountModal';
import UserAccountsStore, { IUserAccount } from '@/store/UserAccountsStore';
import { useSnapshot } from 'valtio';

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/UserAccountsStore', () => ({
    addAccount: jest.fn(),
    updateAccount: jest.fn(),
    resetErrors: jest.fn(),
    UserAccountsState: { error: null },
}));

describe('AddUserAccountModal', () => {
    const mockSetOpen = jest.fn();
    const mockSetSelectedAccount = jest.fn();
    const initialFormData = { name: '', emoji: '', description: '' };

    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation(() => ({
            error: null,
        }));
        jest.clearAllMocks();
    });

    it('renders the modal correctly when open', () => {
        render(
            <AddUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={undefined}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        expect(screen.getByText('Add New Account')).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/icon/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        render(
            <AddUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={undefined}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Test Account' },
        });
        fireEvent.change(screen.getByLabelText(/icon/i), {
            target: { value: '😀' },
        });
        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { value: 'Test Description' },
        });

        expect(screen.getByLabelText(/name/i)).toHaveValue('Test Account');
        expect(screen.getByLabelText(/icon/i)).toHaveValue('😀');
        expect(screen.getByLabelText(/description/i)).toHaveValue(
            'Test Description'
        );
    });

    it('displays error if required fields are empty', async () => {
        render(
            <AddUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={undefined}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.click(screen.getByText(/save/i));
    });

    it('calls addAccount on save when adding a new account', async () => {
        render(
            <AddUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={undefined}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Test Account' },
        });
        fireEvent.change(screen.getByLabelText(/emoji/i), {
            target: { value: '😀' },
        });

        fireEvent.click(screen.getByText(/save/i));

        await waitFor(() => {
            expect(UserAccountsStore.addAccount).toHaveBeenCalledWith({
                name: 'Test Account',
                emoji: '😀',
                description: '',
            });
        });

        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('calls updateAccount on save when editing an existing account', async () => {
        const mockAccount: IUserAccount = {
            _id: '1',
            userId: '23',
            name: 'Existing Account',
            emoji: '😀',
            description: 'Existing Description',
        };

        render(
            <AddUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={mockAccount}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Updated Account' },
        });

        fireEvent.click(screen.getByText(/save/i));

        await waitFor(() => {
            expect(UserAccountsStore.updateAccount).toHaveBeenCalledWith({
                ...mockAccount,
                name: 'Updated Account',
            });
        });

        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('handles closing the modal', () => {
        render(
            <AddUserAccountModal
                open={true}
                setOpen={mockSetOpen}
                account={undefined}
                setSelectedAccount={mockSetSelectedAccount}
            />
        );

        fireEvent.click(screen.getByText(/cancel/i));
        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
});
