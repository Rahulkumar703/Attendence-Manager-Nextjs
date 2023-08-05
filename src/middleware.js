import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export default middleware = async (req) => {


    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    const publicUrl = pathname === '/' || pathname === '/login' || pathname === '/signup';

    if (!publicUrl && !token) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
    }

    if (publicUrl && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }


    return NextResponse.next();


}
export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/login",
        "/signup",
        "/profile",
    ]
}