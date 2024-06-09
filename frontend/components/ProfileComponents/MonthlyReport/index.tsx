import React, { useMemo } from 'react';
import { ExpenseCard } from '../ExpenseCard';
import { ArrowChartUp } from '@/assets';
import { IMonthlyTotals } from '@/store/TracksStore';

interface IMonthlyReportContainerProps {
    monthlyTotals?: IMonthlyTotals;
}

export const MonthlyReportContainer: React.FC<IMonthlyReportContainerProps> = ({
    monthlyTotals,
}) => {
    const savedAmount = useMemo(
        () =>
            parseFloat(monthlyTotals?.income ?? '0') -
            parseFloat(monthlyTotals?.expense ?? '0'),
        [monthlyTotals]
    );

    const savings = parseFloat(monthlyTotals?.savings ?? '0');
    const income = parseFloat(monthlyTotals?.income ?? '0');
    const expense = parseFloat(monthlyTotals?.expense ?? '0');

    const formattedSavings = (savings || income - expense).toFixed(2);

    return (
        <div className='w-full flex flex-col items-start gap-6 px-4 py-3 rounded border border-[#DCDCDC] shadow-sm'>
            <div className='w-full flex items-center justify-between'>
                <span className='font-bold text-xl text-[#070707]'>
                    $Your monthly CashTrack
                </span>
                <div className='flex items-center gap-1'>
                    <span className='text-xs font-bold text-[#070707]'>
                        {savedAmount > 0
                            ? `You save as much as ${savedAmount}$ this month`
                            : `You are ${savedAmount}$ in debt`}
                    </span>
                    <ArrowChartUp
                        className={`w-5 h-5 flex-shrink-0 ${
                            savedAmount >= 0 ? '' : 'scale-y-[-1]'
                        }`}
                        fillColor={savedAmount >= 0 ? '#27B867' : 'red'}
                    />
                </div>
            </div>
            <div className='flex items-center gap-9 w-fulls'>
                <ExpenseCard
                    expenseAmount={parseFloat(
                        monthlyTotals?.income ?? '0'
                    )?.toFixed(2)}
                    expenseLabel='Your Income'
                    expenseDescription='Your monthly income account'
                    expenseIndicatorBgClassName='bg-[#2D76E9]'
                    expensePercentage={0}
                />
                <ExpenseCard
                    expenseAmount={parseFloat(
                        monthlyTotals?.expense ?? '0'
                    )?.toFixed(2)}
                    expenseLabel='Total Expenses'
                    expenseDescription='Your monthly total expenses'
                    expenseIndicatorBgClassName='bg-[#FF0000]'
                    expensePercentage={0}
                />
                <ExpenseCard
                    expenseAmount={savedAmount > 0 ? formattedSavings : '0.00'}
                    expenseLabel='Total Saved money'
                    expenseDescription='Total saved money in your account'
                    expenseIndicatorBgClassName='bg-[#27B867]'
                    expensePercentage={0}
                />
            </div>
        </div>
    );
};
