import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditCategoriesModal from './EditModal';
import CategoriesStore from '@/store/CategoriesStore';
import { ICategory } from '@/store/CategoriesStore';
import { useSnapshot } from 'valtio';

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/CategoriesStore', () => ({
    updateCategory: jest.fn(),
    resetErrors: jest.fn(),
    CategoriesState: { error: null, loading: false },
}));

describe('EditCategoriesModal', () => {
    const mockOnClose = jest.fn();
    const mockCategory: ICategory = {
        _id: '1',
        userId: '23',
        name: 'Test Category',
        icon: '🍔',
        type: 'expense',
        description: 'Test Description',
    };

    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation(() => ({
            error: null,
            loading: false,
        }));
        jest.clearAllMocks();
    });

    it('renders the modal correctly when open', () => {
        render(
            <EditCategoriesModal
                category={mockCategory}
                open={true}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByLabelText('Category Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Icon')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        render(
            <EditCategoriesModal
                category={mockCategory}
                open={true}
                onClose={mockOnClose}
            />
        );

        fireEvent.change(screen.getByLabelText('Category Name'), {
            target: { value: 'Updated Category' },
        });
        fireEvent.change(screen.getByLabelText('Icon'), {
            target: { value: '😀' },
        });
        fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: 'Updated Description' },
        });

        expect(screen.getByLabelText('Category Name')).toHaveValue(
            'Updated Category'
        );
        expect(screen.getByLabelText('Icon')).toHaveValue('😀');
        expect(screen.getByLabelText('Description')).toHaveValue(
            'Updated Description'
        );
    });

    it('calls updateCategory on save when all required fields are filled', async () => {
        render(
            <EditCategoriesModal
                category={mockCategory}
                open={true}
                onClose={mockOnClose}
            />
        );

        fireEvent.change(screen.getByLabelText('Category Name'), {
            target: { value: 'Updated Category' },
        });
        fireEvent.change(screen.getByLabelText('Icon'), {
            target: { value: '😀' },
        });
        fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: 'Updated Description' },
        });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(CategoriesStore.updateCategory).toHaveBeenCalledWith(
                expect.objectContaining({
                    _id: '1',
                    name: 'Updated Category',
                    icon: '😀',
                    type: 'expense',
                    description: 'Updated Description',
                })
            );
        });

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('handles closing the modal', () => {
        render(
            <EditCategoriesModal
                category={mockCategory}
                open={true}
                onClose={mockOnClose}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockOnClose).toHaveBeenCalled();
    });
});
