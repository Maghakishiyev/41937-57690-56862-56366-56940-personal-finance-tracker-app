import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MonthlyReportContainer } from './index';
import { IMonthlyTotals } from '@/store/TracksStore';

jest.mock('../ExpenseCard', () => ({
    ExpenseCard: ({ expenseAmount, expenseLabel, expenseDescription }: any) => (
        <div data-testid='expense-card'>
            <div>{expenseLabel}</div>
            <div>{expenseAmount}</div>
            <div>{expenseDescription}</div>
        </div>
    ),
}));

jest.mock('@/assets', () => ({
    ArrowChartUp: ({ fillColor }: any) => (
        <div data-testid='arrow-chart-up' style={{ fill: fillColor }}>
            ArrowChartUp
        </div>
    ),
}));

describe('MonthlyReportContainer', () => {
    it('renders correctly with given data', () => {
        const mockMonthlyTotals: IMonthlyTotals = {
            income: '3000',
            expense: '1500',
            savings: '500',
        };

        render(<MonthlyReportContainer monthlyTotals={mockMonthlyTotals} />);

        expect(screen.getByText('$Your monthly CashTrack')).toBeInTheDocument();
        expect(
            screen.getByText('You save as much as 1500$ this month')
        ).toBeInTheDocument();
        expect(screen.getByText('Your Income')).toBeInTheDocument();
        expect(screen.getByText('3000.00')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses')).toBeInTheDocument();
        expect(screen.getByText('1500.00')).toBeInTheDocument();
        expect(screen.getByText('Total Saved money')).toBeInTheDocument();
        expect(screen.getByText('500.00')).toBeInTheDocument();
    });

    it('handles case when savings is not provided', () => {
        const mockMonthlyTotals: IMonthlyTotals = {
            income: '3000',
            expense: '1500',
            savings: undefined,
        };

        render(<MonthlyReportContainer monthlyTotals={mockMonthlyTotals} />);

        expect(screen.getByText('$Your monthly CashTrack')).toBeInTheDocument();
        expect(
            screen.getByText('You save as much as 1500$ this month')
        ).toBeInTheDocument();
        expect(screen.getByText('Your Income')).toBeInTheDocument();
        expect(screen.getByText('3000.00')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses')).toBeInTheDocument();
        expect(screen.getAllByText('1500.00')?.[0]).toBeInTheDocument();
        expect(screen.getByText('Total Saved money')).toBeInTheDocument();
        expect(screen.getAllByText('1500.00')?.[1]).toBeInTheDocument();
    });

    it('handles case when user is in debt', () => {
        const mockMonthlyTotals: IMonthlyTotals = {
            income: '1500',
            expense: '3000',
            savings: '0',
        };

        render(<MonthlyReportContainer monthlyTotals={mockMonthlyTotals} />);

        expect(screen.getByText('$Your monthly CashTrack')).toBeInTheDocument();
        expect(screen.getByText('You are -1500$ in debt')).toBeInTheDocument();
        expect(screen.getByText('Your Income')).toBeInTheDocument();
        expect(screen.getByText('1500.00')).toBeInTheDocument();
        expect(screen.getByText('Total Expenses')).toBeInTheDocument();
        expect(screen.getByText('3000.00')).toBeInTheDocument();
        expect(screen.getByText('Total Saved money')).toBeInTheDocument();
        expect(screen.getByText('0.00')).toBeInTheDocument();
    });

    it('renders with no monthlyTotals data', () => {
        render(<MonthlyReportContainer />);

        expect(screen.getByText('$Your monthly CashTrack')).toBeInTheDocument();
        expect(screen.getByText('You are 0$ in debt')).toBeInTheDocument();
        expect(screen.getByText('Your Income')).toBeInTheDocument();
        expect(screen.getAllByText('0.00')?.[0]).toBeInTheDocument();
        expect(screen.getByText('Total Expenses')).toBeInTheDocument();
        expect(screen.getAllByText('0.00')?.[1]).toBeInTheDocument();
        expect(screen.getByText('Total Saved money')).toBeInTheDocument();
        expect(screen.getAllByText('0.00')?.[2]).toBeInTheDocument();
    });
});
