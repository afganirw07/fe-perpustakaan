import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const email = req.cookies.get("email")?.value;
    const role = req.cookies.get("role")?.value;
    const path = req.nextUrl.pathname;

    if (!token || !email) {
        const allowed = ["/", "/auth/login", "/auth/register", "/forbidden"];
        if (!allowed.includes(path)) {
            return NextResponse.redirect(new URL("/forbidden", req.url));
        }
        return NextResponse.next();
    }

    if (path === "/") {
        if (role === "user") {
            return NextResponse.redirect(new URL("/user/homepage", req.url));
        }
        if (role === "petugas") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        if (role === "superadmin") {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
    }

    if (role === "user" && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    if (role === "petugas" && path.startsWith("/user")) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/admin/:path*",
        "/user/:path*",
        "/auth/login",
        "/auth/register",
    ],
};
