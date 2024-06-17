# ExpenseCard Component Documentation

## Overview
The `ExpenseCard` component is a React functional component that displays detailed information about an expense. It showcases the expense label, description, amount, and a percentage indicator with customized styling based on whether the expense is positive or negative.

## Component Signature
```typescript
import React from 'react';

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
}) => { ... };
Dependencies
React: import React, { useMemo } from 'react';
Custom Icon: import { InfoIcon } from '@/assets/InfoIcon';
Description
The ExpenseCard component displays a card with the following details:

Expense Label: The name or title of the expense.
Expense Description: A brief description of the expense.
Expense Amount: The monetary amount of the expense.
Expense Percentage: The percentage change of the expense.
Expense Indicator Background: A class name to style the background indicator based on the expense type.
The component uses the useMemo hook to determine if the expense percentage is positive.

Props
IExpenseCardProps
expenseLabel: string - The label or title of the expense.
expenseDescription: string - A brief description of the expense.
expenseAmount: string - The amount of the expense in dollars.
expensePercentage: number - The percentage change of the expense.
expenseIndicatorBgClassName: string - A class name to style the background of the expense indicator.
Usage
Importing the Component
To use the ExpenseCard component, import it into your React component.


import { ExpenseCard } from './path/to/ExpenseCard';
Example Usage
Here is an example of how to use the ExpenseCard component in a React page or component.


const ExpensesOverview = () => {
    const expenseData = {
        expenseLabel: "Marketing",
        expenseDescription: "Monthly marketing expenses",
        expenseAmount: "1500",
        expensePercentage: 10,
        expenseIndicatorBgClassName: "bg-green-500"
    };

    return (
        <div>
            <ExpenseCard {...expenseData} />
        </div>
    );
};

export default ExpensesOverview;
How It Works
Indicator Background: The background of the expense indicator is styled based on the expenseIndicatorBgClassName prop.
Expense Percentage: The useMemo hook determines if the expensePercentage is positive and applies corresponding styles.
Display: The component renders the expense label, description, amount, and an optional percentage indicator.
Indicator Style
The indicator is a small colored circle next to the expense label. It uses the expenseIndicatorBgClassName prop for its background color.

Percentage Display
The percentage display is commented out in the code, but it can be included to show the percentage change of the expense.


{isExpensePositive && '+'}
{expensePercentage}%
Component Styling
The component uses Tailwind CSS classes for styling.

Dependencies
Make sure to have Tailwind CSS installed and configured in your project to properly style the ExpenseCard.

Notes
Ensure the InfoIcon component is correctly imported and available in your project.
Customize the expenseIndicatorBgClassName based on your design requirements.