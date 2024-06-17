<!-- Overview -->
PieChart is a React functional component designed to display a pie chart using the react-chartjs-2 library. It visualizes a summary of categories based on provided data, with each slice representing a category and its corresponding percentage.

<!-- Props -->

PieChartProps

data: CategorySummary[]
An array of category summary objects to be displayed in the pie chart. Each object should conform to the CategorySummary interface.

<!-- CategorySummary Interface -->
The CategorySummary interface should include the following properties:

name: string
The name of the category.

percentage: number
The percentage value representing the category.

<!-- Usage -->

Importing the Component
To use the PieChart component, import it into your React project along with any necessary dependencies.

import React from 'react';
import PieChart from './components/PieChart';
import { CategorySummary } from '@/store/CategoriesStore'; // Adjust the path as needed

const data: CategorySummary[] = [
    { name: 'Books', percentage: 20 },
    { name: 'Electronics', percentage: 30 },
    { name: 'Clothing', percentage: 25 },
    { name: 'Food', percentage: 25 },
];

const App = () => {
    return (
        <div>
            <h1>Category Distribution</h1>
            <PieChart data={data} />
        </div>
    );
};

export default App;


<!-- Component Structure -->
PieChart Component: The main component that renders the pie chart.

chartData: An object that structures the data for the Pie chart component. It includes labels derived from the category names and datasets that include the percentage values and dynamically generated background colors.

options: Configuration options for the chart. It hides the legend, makes the chart responsive, and maintains the aspect ratio.

<!-- Styling -->
The pie chart is contained within a div element with a specified width of 100% and a height of 400px to ensure proper display and responsiveness.

<!-- Utility Function -->
generateColors: A utility function (assumed to be defined in @/utils/generateColors) that generates an array of colors based on the number of categories. This function ensures that each category slice has a distinct color.