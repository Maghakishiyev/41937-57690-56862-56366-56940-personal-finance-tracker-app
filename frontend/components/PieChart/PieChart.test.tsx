import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PieChart from './index';
import { CategorySummary } from '@/store/CategoriesStore';
import { generateColors } from '@/utils/generateColors';

jest.mock('@/utils/generateColors', () => ({
    generateColors: jest.fn(() => ['#FF6384', '#36A2EB', '#FFCE56']),
}));

describe('PieChart', () => {
    const mockData: CategorySummary[] = [
        { name: 'Food', category: 'Expense', totalAmount: 100, percentage: 50 },
        {
            name: 'Transport',
            category: 'Expense',
            totalAmount: 50,
            percentage: 25,
        },
        {
            name: 'Entertainment',
            category: 'Expense',
            totalAmount: 50,
            percentage: 25,
        },
    ];

    it('renders the PieChart component correctly', () => {
        render(<PieChart data={mockData} />);

        // Check if canvas is rendered
        const canvasElement = screen.getByRole('img');
        expect(canvasElement).toBeInTheDocument();
    });

    it('generates chart data correctly', () => {
        render(<PieChart data={mockData} />);

        // Check if generateColors function is called with correct length
        expect(generateColors).toHaveBeenCalledWith(mockData.length);
    });
});
