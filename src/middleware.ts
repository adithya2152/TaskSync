import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const authCookie = req.cookies.get("user"); // Get the authentication cookie

    console.log("Authentication cookie" , authCookie);
    const protectedRoutes = ["/home", "/profile", "/tasks"]; // Routes that require authentication

    // Case 1: If no cookie and accessing a protected route → Redirect to /login
    if (!authCookie && protectedRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Case 2: If authenticated and on "/", redirect to "/home"
    if (authCookie && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to relevant routes
export const config = {
    matcher: ["/", "/home", "/profile", "/tasks"], // Include "/" to check for redirection
};
