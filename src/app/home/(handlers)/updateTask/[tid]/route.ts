import { NextResponse } from "next/server";
import { updateTask } from "@/db";
import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest)
{
    try{

        const{pathname} = request.nextUrl
        const id = pathname.split('/').pop()

        console.log("param ID" , id);

        if(!id)
        {
            return new NextResponse(JSON.stringify({ error: "Invalid task ID" }), { status: 400 });
        }

        await updateTask(parseInt(id));
        return new NextResponse(JSON.stringify({ message: "Task updated successfully" }), { status: 200 });
    }
    catch(error)
    {

        console.error("Error updating task:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to update task" }),
            { status: 500 }
        );
    }
}