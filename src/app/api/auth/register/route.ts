import { supabase } from "@/util/supabase";
import { NextResponse } from "next/server";
import { CreateUser } from "@/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return new NextResponse(
                JSON.stringify({ error: "Missing Credentials" }),
                { status: 400 }
            );
        }

        // Sign up the user using Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return new NextResponse(
                JSON.stringify({ error: error.message }),
                { status: 400 }
            );
        }

        const user = data.user;
        if (user) {
            // Insert user into database
            const dbResponse = await CreateUser(username, email, user.id);

            if (dbResponse.error) {
                return new NextResponse(
                    JSON.stringify({ error: dbResponse.error }),
                    { status: 500 }
                );
            }

            // Success Response
            const res = NextResponse.json(
                { message: "Signup Success" },
                { status: 201 }
            );

            // Set user cookie
            res.cookies.set("user", JSON.stringify({ id: user.id, email: user.email }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });

            return res;
        }

        return new NextResponse(
            JSON.stringify({ error: "Unexpected error occurred" }),
            { status: 500 }
        );
    } catch (error) {
        console.error("❌ Error in POST route:", error);
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
