import { GetTaskCounts } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch task counts
        const taskCounts = await GetTaskCounts();

        if (taskCounts) {
            return NextResponse.json(taskCounts, { status: 200 });
        }

        // Return error if task counts couldn't be fetched
        return new NextResponse(
            JSON.stringify({ error: "Failed to fetch tasks" }),
            { status: 500 }
        );

    } catch (error) {
        console.error("Error fetching task counts:", error);
        
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
