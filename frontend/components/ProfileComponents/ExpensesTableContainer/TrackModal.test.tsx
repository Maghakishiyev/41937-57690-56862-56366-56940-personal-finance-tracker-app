import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrackModal from './TrackModal';
import CategoriesStore from '@/store/CategoriesStore';
import UserAccountsStore from '@/store/UserAccountsStore';
import { ITrack } from '@/store/TracksStore';
import { useSnapshot } from 'valtio';

// Mock the useSnapshot hook from valtio
jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

// Mock the CategoriesStore
jest.mock('@/store/CategoriesStore', () => ({
    CategoriesState: {
        categories: [
            { _id: '1', name: 'Food', icon: '🍔', type: 'expense' },
            { _id: '2', name: 'Salary', icon: '💼', type: 'income' },
        ],
        loading: false,
    },
    fetchCategories: jest.fn(),
}));

jest.mock('@/store/UserAccountsStore', () => ({
    UserAccountsState: {
        accounts: [
            { _id: '1', name: 'Checking', emoji: '🏦' },
            { _id: '2', name: 'Savings', emoji: '💰' },
        ],
        loading: false,
    },
    fetchAccounts: jest.fn(),
}));

describe('TrackModal', () => {
    const mockTrack: ITrack = {
        _id: '1',
        userId: '23',
        date: '2022-01-01',
        amount: '100',
        category: '1',
        account: '1',
        type: 'expense',
        note: 'Test Note',
        description: 'Test Description',
    };

    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnDelete = jest.fn();

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
            }
            return state;
        });
    });

    it('renders TrackModal with correct data', () => {
        render(
            <TrackModal
                track={mockTrack}
                open={true}
                onClose={mockOnClose}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByDisplayValue('2022-01-01')).toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue('Test Description')
        ).toBeInTheDocument();
    });

    it('calls onSave with updated track data when save button is clicked', () => {
        render(
            <TrackModal
                track={mockTrack}
                open={true}
                onClose={mockOnClose}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        fireEvent.change(screen.getByDisplayValue('100'), {
            target: { value: '200' },
        });
        fireEvent.click(screen.getByText('Save'));

        expect(mockOnSave).toHaveBeenCalledWith({
            ...mockTrack,
            amount: '200',
        });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onDelete with track id when delete button is clicked', () => {
        render(
            <TrackModal
                track={mockTrack}
                open={true}
                onClose={mockOnClose}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        fireEvent.click(screen.getByText('Delete'));

        expect(mockOnDelete).toHaveBeenCalledWith('1');
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('handles changes in input fields', () => {
        render(
            <TrackModal
                track={mockTrack}
                open={true}
                onClose={mockOnClose}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        const noteInput = screen.getByDisplayValue('Test Note');
        fireEvent.change(noteInput, { target: { value: 'Updated Note' } });
        expect(noteInput).toHaveValue('Updated Note');

        const descriptionInput = screen.getByDisplayValue('Test Description');
        fireEvent.change(descriptionInput, {
            target: { value: 'Updated Description' },
        });
        expect(descriptionInput).toHaveValue('Updated Description');
    });
});
