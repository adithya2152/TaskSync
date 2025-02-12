"use client";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
    const [taskData, setTaskData] = useState({ totalTasks: 0, completedTasks: 0 });

    useEffect(() => {
        // Fetch task counts from the API
        async function fetchTaskCounts() {
            try {
                const response = await fetch("/home/gettaskCount");
                const data = await response.json();
                console.log("taskcount",data);
                setTaskData(data);
            } catch (error) {
                console.error("Error fetching task counts:", error);
            }
        }

        fetchTaskCounts();
    }, []);

    const { totalTasks, completedTasks } = taskData;
    const pendingTasks = totalTasks - completedTasks; // Calculate pending tasks

    const data = {
        labels: ["Completed", "Pending"],
        datasets: [
            {
                label: "Tasks",
                data: [completedTasks, pendingTasks],
                backgroundColor: ["#4CAF50", "#FF5252"], // Green for completed, Red for pending
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const, 
            },
        },
    };
    

    return (
        <div style={{ width: "300px", height: "300px" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}
