import { supabase } from "@/util/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        
        const cred = await req.json()
        const {username , email , password} = cred

        if(!username || !email || !password){
            return new NextResponse(
                JSON.stringify({ error: "Missing Credentials" }),
                { status: 400 }
            );
        }

        const {data , error}= await supabase.auth.signInWithPassword({
            email,
            password
        });

        if(error)
        {
            return new NextResponse(
                JSON.stringify({ error }),
                { status: 500 }
            );
        }

        const user = data.user

        if(user){
            const res = NextResponse.json(
                {message:'Login Successfull'},
                {status: 200 }
            );
            res.cookies.set(
                "user",
                JSON.stringify({ id: user.id, email: user.email }),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 7,
                }
            );

            return res
        }
    } catch (error) {
        
        if(error instanceof Error){
            console.error("Error occurred during login:", error.message || error);
            return new NextResponse(
                JSON.stringify({ error: error.message || "Unknown Error" }),
                { status: 500 }
            );
        }
    }
}