import { NextResponse } from "next/server";
import { updateTask } from "@/db";
import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest, context: { params: { tid: string } }) {
    try {
        const { tid } = context.params; // Access params correctly
        const taskId = parseInt(tid, 10);

        if (isNaN(taskId)) {
            return new NextResponse(JSON.stringify({ error: "Invalid task ID" }), { status: 400 });
        }

        await updateTask(taskId);
        return new NextResponse(JSON.stringify({ message: "Task updated successfully" }), { status: 200 });

    } catch (error) {
        console.error("Error updating task:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to update task" }),
            { status: 500 }
        );
    }
}
