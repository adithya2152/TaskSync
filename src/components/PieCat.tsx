"use client"; // Ensures it's a Client Component

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components
Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    labels: string[];
    data: number[];
}

const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                    "#FFCE56", // Yellow
                    "#4CAF50", // Green
                    "#8E44AD", // Purple
                ],
                hoverOffset: 4,
            },
        ],
    };

    console.log("chart dta" , chartData)
    return (
        <div style={{ width: "400px", height: "400px" }}>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
