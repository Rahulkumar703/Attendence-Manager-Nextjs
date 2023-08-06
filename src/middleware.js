import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

const middleware = async (req) => {

    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        const { pathname } = req.nextUrl;

        const publicUrl = pathname === '/' || pathname === '/login' || pathname === '/signup';

        if (!publicUrl && !token) {
            return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
        }

        const roleBasedPath = pathname.includes('/admin') || pathname.includes('/faculty') || pathname.includes('/student');

        if ((publicUrl && token) || roleBasedPath) {
            if (token.level === 3 && !pathname.includes('admin/dashboard'))
                return NextResponse.redirect(new URL('/admin/dashboard', req.url));
            if (token.level === 2 && !pathname.includes('faculty/dashboard'))
                return NextResponse.redirect(new URL('/faculty/dashboard', req.url));
            if (token.level === 1 && !pathname.includes('student/dashboard'))
                return NextResponse.redirect(new URL('/student/dashboard', req.url));
        }

    } catch (error) {
        console.error(error);
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",

        "/admin/:path*",
        "/faculty/:path*",
        "/student/:path*",
        "/profile",
    ]
}

export default middleware;