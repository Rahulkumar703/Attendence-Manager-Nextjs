import connect from "@/db/config";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';


export async function POST(req) {
    connect();
    try {
        const reqBody = await req.json();
        const { roll, password } = reqBody;

        // Validating Request Body
        if (!roll || !password) {
            return NextResponse.json({ message: "Fill all details correctly", type: "error" })
        }


        // Check if user Exist
        const user = await User.findOne({ roll });
        if (!user) {
            return NextResponse.json({ message: "You are Not registered.", type: "warning" }, { status: 404 })
        }


        // Verify Password
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return NextResponse.json({ message: "Password not matched.", type: "error" }, { status: 400 })
        }


        // create response
        const response = NextResponse.json({
            message: "Logged in Successfully", type: 'success'
        }, { status: 200 });



        // return response
        return response;


    } catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}