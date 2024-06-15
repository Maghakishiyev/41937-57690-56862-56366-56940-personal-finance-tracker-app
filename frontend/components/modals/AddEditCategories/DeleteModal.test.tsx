import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteModal from './DeleteModal';
import CategoriesStore from '@/store/CategoriesStore';
import { useSnapshot } from 'valtio';

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/CategoriesStore', () => ({
    deleteCategory: jest.fn(),
    resetErrors: jest.fn(),
    CategoriesState: { error: null },
}));

describe('DeleteModal', () => {
    const mockSetShowDeleteModal = jest.fn();
    const mockSetSelectedCategory = jest.fn();

    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation(() => ({
            error: null,
        }));
        jest.clearAllMocks();
    });

    it('renders the modal correctly when open', () => {
        render(
            <DeleteModal
                deleteCategoryId='1'
                setShowDeleteModal={mockSetShowDeleteModal}
                showDeleteModal={true}
                setSelectedCategory={mockSetSelectedCategory}
            />
        );

        expect(screen.getByText('Delete Category')).toBeInTheDocument();
        expect(
            screen.getByText('Are you sure you want to delete this account?')
        ).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('calls deleteCategory on delete', async () => {
        render(
            <DeleteModal
                deleteCategoryId='1'
                setShowDeleteModal={mockSetShowDeleteModal}
                showDeleteModal={true}
                setSelectedCategory={mockSetSelectedCategory}
            />
        );

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(CategoriesStore.deleteCategory).toHaveBeenCalledWith('1');
        });

        expect(mockSetShowDeleteModal).toHaveBeenCalledWith(false);
        expect(mockSetSelectedCategory).toHaveBeenCalledWith(undefined);
    });

    it('handles closing the modal', () => {
        render(
            <DeleteModal
                deleteCategoryId='1'
                setShowDeleteModal={mockSetShowDeleteModal}
                showDeleteModal={true}
                setSelectedCategory={mockSetSelectedCategory}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockSetShowDeleteModal).toHaveBeenCalledWith(false);
        expect(mockSetSelectedCategory).toHaveBeenCalledWith(undefined);
    });
});
