import { InfoIcon } from '@/assets/InfoIcon';
import React, { useMemo } from 'react';

export interface IExpenseCardProps {
    expenseLabel: string;
    expenseDescription: string;
    expenseAmount: string;
    expensePercentage: number;
    expenseIndicatorBgClassName: string;
}

export const ExpenseCard: React.FC<IExpenseCardProps> = ({
    expenseAmount,
    expenseDescription,
    expenseIndicatorBgClassName,
    expenseLabel,
    expensePercentage,
}) => {
    const isExpensePositive = useMemo(
        () => expensePercentage > 0,
        [expensePercentage]
    );

    return (
        <div className='flex flex-col items-start gap-6 min-w-[320px] bg-[#E6E9ED] bg-opacity-75 rounded-lg px-2.5 py-2'>
            <div className='flex items-center gap-1'>
                <span
                    role='indicator'
                    className={
                        'w-2 h-2 flex-shrink-0 rounded-full ' +
                        expenseIndicatorBgClassName
                    }
                />
                <span>{expenseLabel}</span>
                <InfoIcon className='w-2 h-2 flex-shrink-0' />
            </div>
            <div className='flex items-center gap-2'>
                <span className='font-semibold text-2xl text-black'>
                    ${expenseAmount}
                </span>
                {/* <span
                    className={
                        'px-1 py-0.5 rounded-sm bg-opacity-20 text-[10px] leading-3 font-semibold ' +
                        (isExpensePositive
                            ? 'bg-[#27B867] text-[#27B867]'
                            : 'bg-[#FF0000] text-[#FF0000]')
                    }
                >
                    {isExpensePositive && '+'}
                    {expensePercentage}%
                </span> */}
            </div>
            <div className='text-sm font-semibold text-black'>
                {expenseDescription}
            </div>
        </div>
    );
};
