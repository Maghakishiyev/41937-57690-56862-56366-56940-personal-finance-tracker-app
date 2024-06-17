Functional Description
useMemo
The useMemo hook is used to calculate the saved amount for the month. It computes the difference between the income and expense values provided in the monthlyTotals prop. This calculation is memoized to optimize performance and avoid unnecessary recalculations.


const savedAmount = useMemo(
    () =>
        parseFloat(monthlyTotals?.income ?? '0') -
        parseFloat(monthlyTotals?.expense ?? '0'),
    [monthlyTotals]
);
Data Formatting
The component ensures that all numeric values are parsed to floats and formatted to two decimal places for consistency and readability.


const savings = parseFloat(monthlyTotals?.savings ?? '0');
const income = parseFloat(monthlyTotals?.income ?? '0');
const expense = parseFloat(monthlyTotals?.expense ?? '0');
const formattedSavings = (savings || income - expense).toFixed(2);
Conditional Rendering
The component conditionally renders the message and icon based on whether the user has saved money or is in debt for the month. The icon color and orientation change accordingly.


<ArrowChartUp
    className={`w-5 h-5 flex-shrink-0 ${savedAmount >= 0 ? '' : 'scale-y-[-1]'}`}
    fillColor={savedAmount >= 0 ? '#27B867' : 'red'}
/>
ExpenseCard Components
The component utilizes the ExpenseCard component to display the user's income, total expenses, and total saved money. Each card provides detailed information and is styled with appropriate colors.


<ExpenseCard
    expenseAmount={parseFloat(monthlyTotals?.income ?? '0')?.toFixed(2)}
    expenseLabel='Your Income'
    expenseDescription='Your monthly income account'
    expenseIndicatorBgClassName='bg-[#2D76E9]'
    expensePercentage={0}
/>
<ExpenseCard
    expenseAmount={parseFloat(monthlyTotals?.expense ?? '0')?.toFixed(2)}
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