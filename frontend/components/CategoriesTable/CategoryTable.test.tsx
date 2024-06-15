import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTable } from './';
import { ICategory } from '@/store/CategoriesStore';
import '@testing-library/jest-dom';

// Mock data for categories
const categories: ICategory[] = [
    {
        _id: '1',
        name: 'Groceries',
        type: 'expense',
        icon: '🛒',
        userId: 'user1',
    },
    {
        _id: '2',
        name: 'Salary',
        type: 'income',
        icon: '💼',
        userId: 'user2',
    },
];

describe('CategoryTable Component', () => {
    // Test for correct rendering of categories based on the type prop
    it('should display only categories of the specified type', () => {
        render(
            <CategoryTable
                type='expense'
                categories={categories}
                handleEditCategory={() => {}}
                handleDeleteCategory={() => {}}
            />
        );

        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.queryByText('Salary')).toBeNull(); // Salary should not be in the document
    });

    // Test for clicking the edit button
    it('should call handleEditCategory when edit button is clicked', () => {
        const handleEditCategory = jest.fn();
        render(
            <CategoryTable
                type='expense'
                categories={categories}
                handleEditCategory={handleEditCategory}
                handleDeleteCategory={() => {}}
            />
        );

        const editButton = screen.getByLabelText('edit');
        fireEvent.click(editButton);
        expect(handleEditCategory).toHaveBeenCalledWith(categories[0]);
    });

    // Test for clicking the delete button
    it('should call handleDeleteCategory when delete button is clicked', () => {
        const handleDeleteCategory = jest.fn();
        render(
            <CategoryTable
                type='expense'
                categories={categories}
                handleEditCategory={() => {}}
                handleDeleteCategory={handleDeleteCategory}
            />
        );

        const deleteButton = screen.getByLabelText('delete');
        fireEvent.click(deleteButton);
        expect(handleDeleteCategory).toHaveBeenCalledWith(categories[0]);
    });
});
