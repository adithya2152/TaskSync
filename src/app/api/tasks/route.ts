import { NextResponse } from "next/server";
import { GetTasks } from "@/db";
export async function GET()
{
    try {
        
        const tasks = await GetTasks();

        if(tasks)
        {
            return NextResponse.json(tasks, { status: 200 });
        }
        return new NextResponse(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
    } catch (error) {
        
        console.error("Error fetching tasks:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
    }
}