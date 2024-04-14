import React from 'react';
import { ExpenseCard } from '../ExpenseCard';
import { ArrowChartUp } from '@/assets';

export const MonthlyReportContainer: React.FC = () => {
    return (
        <div className='w-full flex flex-col items-start gap-6 px-4 py-3 rounded border border-[#DCDCDC] shadow-sm'>
            <div className='w-full flex items-center justify-between'>
                <span className='font-bold text-xl text-[#070707]'>
                    $Your monthly CashTrack
                </span>
                <div className='flex items-center gap-1'>
                    <span className='text-xs font-bold text-[#070707]'>
                        You save as much as xx $ this month
                    </span>
                    <ArrowChartUp
                        className='w-5 h-5 flex-shrink-0'
                        fillColor='#27B867'
                    />
                </div>
            </div>
            <div className='flex items-center gap-9 w-fulls'>
                <ExpenseCard
                    expenseAmount='1,523.21'
                    expenseLabel='Your Income'
                    expenseDescription='Your monthly income account'
                    expenseIndicatorBgClassName='bg-[#2D76E9]'
                    expensePercentage={12}
                />
                <ExpenseCard
                    expenseAmount='123.21'
                    expenseLabel='Total Expenses'
                    expenseDescription='Your monthly total expenses'
                    expenseIndicatorBgClassName='bg-[#FF0000]'
                    expensePercentage={-2}
                />
                <ExpenseCard
                    expenseAmount='223.21'
                    expenseLabel='Total Saved money'
                    expenseDescription='Total saved money in your account'
                    expenseIndicatorBgClassName='bg-[#27B867]'
                    expensePercentage={12}
                />
            </div>
        </div>
    );
};
