import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { TaskSync_Tasks, TaskSync_Users } from "./schema";
import { eq , sql , count , and} from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectionString = process.env.NEXT_PUBLIC_SUPABASE_CONNECTION_STRING

if (!connectionString) {
    throw new Error("❌ SUPABASE_CONNECTION_STRING is not defined");
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

console.log("✅ Database initialized");

// Function to create a new user with error handling
export async function CreateUser(username: string, email: string, uuid: string) {
    try {
        // Check if user already exists
        const existingUser = await db
            .select()
            .from(TaskSync_Users)
            .where(eq(TaskSync_Users.authid, uuid));

        if (existingUser.length > 0) {
            console.log("⚠️ User already exists with this ID:", uuid);
            return { error: "User already exists" };
        }

        // Insert user into DB
        await db.insert(TaskSync_Users).values({
            authid: uuid,
            username,
            email,
        });

        console.log("✅ User created successfully:", username);
        return { success: true };
    } catch (error) {
        console.error("❌ Error inserting user:", error);
        return { error: "Failed to insert user into database" };
    }
}



export async function GetTasks() {
    try {
        const tasks = await db
            .select()
            .from(TaskSync_Tasks)
            .orderBy(
                sql`CASE 
                        WHEN priority = 'High' THEN 1 
                        WHEN priority = 'Low' THEN 2 
                        ELSE 3 
                    END`
            );

        console.log("✅ Fetched tasks:", tasks);
        return tasks;
    } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        return { error: "Failed fetching tasks" };
    }
}



export async function getCategoryCounts() {
    const result = await db
        .select({
            category: TaskSync_Tasks.category,
            count: sql<number>`COUNT(*)`
        })
        .from(TaskSync_Tasks)
        .groupBy(TaskSync_Tasks.category);

    return result;
}

 
 
export async function GetTaskCounts() {
    // Query for total task count
    const totalResult = await db
        .select({ totalTasks: count() })
        .from(TaskSync_Tasks);

    // Query for completed task count
    const completedResult = await db
        .select({ completedTasks: count() })
        .from(TaskSync_Tasks)
        .where(eq(TaskSync_Tasks.status, "Completed"));

    return {
        totalTasks: totalResult[0]?.totalTasks ?? 0, 
        completedTasks: completedResult[0]?.completedTasks ?? 0,
    };
 

}

export async function getTodayTasks() {
    try {
        const todayTasks = await db
            .select()
            .from(TaskSync_Tasks)
            .where(
                and(
                    sql`${TaskSync_Tasks.end_date}::DATE = CURRENT_DATE`,  // ✅ FIXED CONDITION
                    eq(TaskSync_Tasks.status, "Pending")
                )
            );

        console.log("✅ Fetched today's tasks:", todayTasks);
        return todayTasks;
    } catch (error) {
        console.error("❌ Error fetching today's tasks:", error);
        return { error: "Failed to fetch today's tasks" };
    }
}

export async function updateTask( tid:number)
{
    const completetask = await db
        .update(TaskSync_Tasks)
        .set({ status: "Completed" })
        .where(eq(TaskSync_Tasks.tid, tid));

    console.log("✅ Task updated:", completetask);
    return completetask;
}