"use client"
import Card from "@/components/Card"
import { useState, useEffect } from "react"
import styles from "./Duetoday.module.css"
import axios from "axios"

type TASKS = {
    tid: number;
    task_title: string;
    task_description: string;
    start_date: string;
    end_date: string;
    category: string;
    priority: string;
    status: string;
};

export default function Duetoday() {
    const [tasks, setTasks] = useState<TASKS[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get("/home/getTaskToday");
                if (res.status === 200) {
                    console.log("Fetched tasks for today:", res.data);
                    setTasks(res.data);
                }
            } catch (error) {
                console.log("Failed to fetch tasks", error);
            }
        };

        fetchTasks();
    }, []);

    const markTaskCompleted = async (taskId: number) => {
        try {
            const res = await axios.put(`/home/updateTask/${taskId}`);

            if (res.status === 200) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.tid === taskId ? { ...task, status: "Completed" } : task
                    )
                );
            } else {
                console.log("Failed to update task");
            }
        } catch (error) {
            console.log("Error updating task:", error);
        }
    };

    return (
        <Card>
            <div className={styles.container}>
                <h2 className={styles.title}>Tasks Due Today</h2>
                {tasks.length > 0 ? (
                    <ul className={styles.taskList}>
                        {tasks.map((task) => (
                            <li
                                key={task.tid}
                                className={`${styles.taskItem} ${
                                    task.status === "Completed" ? styles.completed : ""
                                }`}
                                onClick={() => markTaskCompleted(task.tid)}
                            >
                                <div className={styles.taskContent}>
                                    <strong className={styles.taskTitle}>{task.task_title}</strong>
                                    <p className={styles.taskDescription}>{task.task_description}</p>
                                </div>
                                <span
                                    className={`${styles.priorityBadge} ${
                                        task.priority === "High"
                                            ? styles.high
                                            : task.priority === "Medium"
                                            ? styles.medium
                                            : styles.low
                                    }`}
                                >
                                    {task.priority}
                                </span>
                                <div className={styles.completeOverlay}>Complete Task</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noTasks}>No tasks due today.</p>
                )}
            </div>
        </Card>
    );
}
