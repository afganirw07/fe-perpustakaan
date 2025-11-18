import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const role = req.cookies.get("role")?.value;
    const path = req.nextUrl.pathname;

    if (!token) {
        const allowed = ["/", "/auth/login", "/auth/register", "/forbidden"];
        if (!allowed.includes(path)) {
            return NextResponse.redirect(new URL("/forbidden", req.url));
        }
        return NextResponse.next();
    }

    if (role === "user" && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    if (role === "petugas" && path.startsWith("/homepage")) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    if (role === "superadmin" && path.startsWith("/homepage")) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/users/:path*",
    ],
};
