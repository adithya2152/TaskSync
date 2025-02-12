import { getTodayTasks } from "@/db";
import { NextResponse } from "next/server";

export async function GET()
{
    try {
        
        const todayTasks = await getTodayTasks();
        return new NextResponse(JSON.stringify(todayTasks), { status: 200 });

    } catch (error) {
        
        console.error("Error fetching today's tasks:", error);

        return new NextResponse(
            JSON.stringify({ error: "Failed to fetch today's tasks" }),
            { status: 500 }
        );
    }
}