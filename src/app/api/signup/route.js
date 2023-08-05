import User from "@/models/User";
import connect from "@/db/config";
import { NextResponse } from "next/server";


export async function POST(req) {
    connect();
    try {

        const reqBody = await req.json();

        const { roll, semester, branch, name, email, password } = reqBody;

        // validating Request body
        if (!roll || !semester || !branch || !name || !email || !password) {
            return NextResponse.json({ message: "Fill all details correctly", type: "error" })
        }



        // Check if User already exist
        const user = await User.findOne({ $or: [{ email }, { roll }] });
        if (user) {
            return NextResponse.json({ message: "You are Already registered", type: "warning" })
        }



        // Create The User
        const newUser = new User({ roll, semester, branch, name, email, password });
        await newUser.save();



        // create response
        const response = NextResponse.json({
            message: "Signed up Successfully", type: 'success'
        }, { status: 200 });



        // return response
        return response;


    } catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}