import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExpenseCard, IExpenseCardProps } from './';

// Mock the InfoIcon component
jest.mock('@/assets/InfoIcon', () => ({
    InfoIcon: () => <svg data-testid='info-icon' />,
}));

const defaultProps: IExpenseCardProps = {
    expenseAmount: '100.00',
    expenseDescription: 'Test Description',
    expenseIndicatorBgClassName: 'bg-red-500',
    expenseLabel: 'Test Label',
    expensePercentage: -5,
};

describe('ExpenseCard', () => {
    it('renders correctly with given props', () => {
        render(<ExpenseCard {...defaultProps} />);

        expect(screen.getByText('$100.00')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('applies the correct indicator background class', () => {
        render(<ExpenseCard {...defaultProps} />);

        const indicator = screen.getByRole('indicator');
        expect(indicator).toHaveClass('bg-red-500');
    });
});
