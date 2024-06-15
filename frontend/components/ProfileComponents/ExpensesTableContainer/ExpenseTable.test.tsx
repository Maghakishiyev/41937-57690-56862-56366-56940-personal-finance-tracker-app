import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExpensesTableContainer } from './index';
import { useSnapshot } from 'valtio';
import TrackStore, { ITrackState } from '@/store/TracksStore';
import CategoriesStore, { ICategoryState } from '@/store/CategoriesStore';
import UserAccountsStore, {
    IuserAccountState,
} from '@/store/UserAccountsStore';

// Mock the imports from valtio and other stores
jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/TracksStore', () => ({
    fetchTracks: jest.fn(),
    updateTrack: jest.fn(),
    deleteTrack: jest.fn(),
    TrackState: {
        tracks: [],
        error: null,
    },
}));

jest.mock('@/store/CategoriesStore', () => ({
    fetchCategories: jest.fn(),
    CategoriesState: {
        categories: [],
        loading: false,
    },
}));

jest.mock('@/store/UserAccountsStore', () => ({
    fetchAccounts: jest.fn(),
    UserAccountsState: {
        accounts: [],
        loading: false,
    },
}));

describe('ExpensesTableContainer', () => {
    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation((state) => {
            if (state === TrackStore.TrackState) {
                return {
                    tracks: [
                        {
                            _id: '1',
                            amount: '100.00',
                            category: 'Food',
                            date: '2022-01-01',
                            description: 'Groceries',
                            type: 'expense',
                        },
                    ],
                    error: null,
                } as ITrackState;
            } else if (state === CategoriesStore.CategoriesState) {
                return {
                    categories: [
                        { _id: '1', name: 'Food', icon: '🍔', type: 'expense' },
                    ],
                    loading: false,
                } as ICategoryState;
            } else if (state === UserAccountsStore.UserAccountsState) {
                return {
                    accounts: [
                        { _id: '1', name: 'Checking', emoji: '🏦' },
                        { _id: '2', name: 'Savings', emoji: '💰' },
                    ],
                    loading: false,
                } as IuserAccountState;
            }
            return state;
        });
    });

    it('renders the component and displays the tabs', () => {
        render(<ExpensesTableContainer />);
        expect(screen.getByText('All Transactions')).toBeInTheDocument();
        expect(screen.getByText('Income')).toBeInTheDocument();
        expect(screen.getByText('Expense')).toBeInTheDocument();
        expect(screen.getByText('Transfers')).toBeInTheDocument();
    });

    it('fetches categories and accounts on mount', async () => {
        render(<ExpensesTableContainer />);
        expect(CategoriesStore.fetchCategories).toHaveBeenCalled();
        expect(UserAccountsStore.fetchAccounts).toHaveBeenCalled();
    });

    it('displays tracks in the table', async () => {
        render(<ExpensesTableContainer />);
        expect(screen.getByText('2022-01-01')).toBeInTheDocument();
        expect(screen.getByText('-100.00$')).toBeInTheDocument();
    });

    it('open the TrackModal on row click', async () => {
        render(<ExpensesTableContainer />);
        const row = screen.getByText('2022-01-01').closest('div[role="row"]');
        fireEvent.click(row as Element);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('fetches tracks based on the selected tab', async () => {
        render(<ExpensesTableContainer />);
        const incomeTab = screen.getByText('Income');
        fireEvent.click(incomeTab);
        expect(TrackStore.fetchTracks).toHaveBeenCalledWith({ type: 'income' });
    });
});
