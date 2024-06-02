// components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { generateColors } from '@/utils/generateColors';
import { CategorySummary } from '@/store/CategoriesStore';

interface PieChartProps {
    data: CategorySummary[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.name),
        datasets: [
            {
                data: data.map((item) => item.percentage),
                backgroundColor: generateColors(data.length),
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
