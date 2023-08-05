import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

const middleware = async (req) => {

    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });


        console.log(process.env.NEXTAUTH_SECRET, "==", token);

        const { pathname } = req.nextUrl;

        const publicUrl = pathname === '/' || pathname === '/login' || pathname === '/signup';

        if (!publicUrl && !token) {
            return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
        }

        if (publicUrl && token) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

    } catch (error) {
        console.error(error);
    }


    // return NextResponse.next();


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

export default middleware;