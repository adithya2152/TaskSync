import { NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { TaskSync_Tasks } from "@/db/schema";

export async function GET() {
  try {
    const tasks = await db
      .select({
        id: TaskSync_Tasks.tid,
        title: TaskSync_Tasks.task_title,
        dueDate: TaskSync_Tasks.end_date,
      })
      .from(TaskSync_Tasks)
      .where(eq(TaskSync_Tasks.status, "Pending"));

    console.log("Fetched Tasks:", tasks);  

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
  }
}
