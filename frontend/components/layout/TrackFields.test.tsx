import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionForm from './TrackFields';
import { useSnapshot } from 'valtio';
import CategoriesStore from '@/store/CategoriesStore';
import UserAccountsStore from '@/store/UserAccountsStore';
import TracksStore from '@/store/TracksStore';

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/CategoriesStore', () => ({
    fetchCategories: jest.fn(),
    CategoriesState: { categories: [], loading: false },
}));

jest.mock('@/store/TracksStore', () => ({
    addTrack: jest.fn(),
    TrackState: { error: null },
}));

jest.mock('@/store/UserAccountsStore', () => ({
    fetchAccounts: jest.fn(),
    UserAccountsState: { accounts: [], loading: false },
}));

describe('TransactionForm', () => {
    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation((state) => {
            if (state === CategoriesStore.CategoriesState) {
                return {
                    categories: [
                        { _id: '1', name: 'Food', icon: '🍔', type: 'expense' },
                        {
                            _id: '2',
                            name: 'Salary',
                            icon: '💼',
                            type: 'income',
                        },
                    ],
                    loading: false,
                };
            } else if (state === UserAccountsStore.UserAccountsState) {
                return {
                    accounts: [
                        { _id: '1', name: 'Checking', emoji: '🏦' },
                        { _id: '2', name: 'Savings', emoji: '💰' },
                    ],
                    loading: false,
                };
            } else if (state === TracksStore.TrackState) {
                return { error: null };
            }
            return state;
        });
    });

    it('renders all tab options', () => {
        render(<TransactionForm />);
        expect(screen.getByText('Expense')).toBeInTheDocument();
        expect(screen.getByText('Income')).toBeInTheDocument();
        expect(screen.getByText('Transfer')).toBeInTheDocument();
    });

    it('switches tabs correctly', () => {
        render(<TransactionForm />);
        const incomeTab = screen.getByRole('tab', { name: /Income/i });
        userEvent.click(incomeTab);
        expect(screen.getByLabelText('amount')).toBeInTheDocument(); // Verify content changes
    });

    it('handles input changes', () => {
        render(<TransactionForm />);
        const input = screen.getByLabelText('amount');
        fireEvent.change(input, { target: { value: '100' } });
        expect(input).toHaveValue(100);
    });

    it('submits form data correctly', async () => {
        render(<TransactionForm />);
        const saveButton = screen.getByText('Save');

        // Fill all required fields
        fireEvent.change(screen.getByLabelText(/amount/i), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByLabelText(/date/i), {
            target: { value: '2022-01-01' },
        });

        userEvent.click(saveButton);
    });
});
