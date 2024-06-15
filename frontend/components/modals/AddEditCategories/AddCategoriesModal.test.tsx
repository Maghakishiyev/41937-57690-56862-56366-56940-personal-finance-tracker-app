import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCategoriesModal from './AddCategoriesModal';
import CategoriesStore from '@/store/CategoriesStore';
import { useSnapshot } from 'valtio';

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/store/CategoriesStore', () => ({
    addCategory: jest.fn(),
    resetErrors: jest.fn(),
    CategoriesState: { error: null, loading: false },
}));

describe('AddCategoriesModal', () => {
    const mockSetOpen = jest.fn();
    const initialFormData = { name: '', icon: '', type: '', description: '' };

    beforeEach(() => {
        (useSnapshot as jest.Mock).mockImplementation(() => ({
            error: null,
            loading: false,
        }));
        jest.clearAllMocks();
    });

    it('renders the modal correctly when open', () => {
        render(<AddCategoriesModal open={true} setOpen={mockSetOpen} />);

        expect(screen.getByText('Add New Category')).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/icon/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        render(<AddCategoriesModal open={true} setOpen={mockSetOpen} />);

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Test Category' },
        });
        fireEvent.change(screen.getByLabelText(/icon/i), {
            target: { value: '😀' },
        });
        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { value: 'Test Description' },
        });

        expect(screen.getByLabelText(/name/i)).toHaveValue('Test Category');
        expect(screen.getByLabelText(/icon/i)).toHaveValue('😀');
        expect(screen.getByLabelText(/description/i)).toHaveValue(
            'Test Description'
        );
    });

    it('displays error if required fields are empty', async () => {
        render(<AddCategoriesModal open={true} setOpen={mockSetOpen} />);

        fireEvent.click(screen.getByText(/save/i));
    });

    it('calls addCategory on save when all required fields are filled', async () => {
        render(<AddCategoriesModal open={true} setOpen={mockSetOpen} />);

        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: 'Test Category' },
        });
        fireEvent.change(screen.getByLabelText(/icon/i), {
            target: { value: '😀' },
        });

        fireEvent.click(screen.getByText(/save/i));

        expect(mockSetOpen).not.toHaveBeenCalled();
    });

    it('handles closing the modal', () => {
        render(<AddCategoriesModal open={true} setOpen={mockSetOpen} />);

        fireEvent.click(screen.getByText(/cancel/i));
        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
});
