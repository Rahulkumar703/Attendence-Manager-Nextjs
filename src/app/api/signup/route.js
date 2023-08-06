import connect from "@/db/config";
import { NextResponse } from "next/server";
import Faculty from "@/models/Faculty";
import Student from "@/models/Student";


export async function POST(req) {
    try {
        connect();

        const reqBody = await req.json();

        const { userId, department, name, email, password } = reqBody;


        // validating Request body
        if (!userId || !department || !name || !email || !password) {
            return NextResponse.json(
                { message: "Fill all details correctly", type: "error" },
                { status: 400 }
            );
        }


        let response;

        // If Signing Up a Faculty
        if (userId && userId.toString().length < 4) {

            // Check if User already exist
            const user = await Faculty.findOne({ $or: [{ email }, { userId }] });
            if (user) {
                return NextResponse.json(
                    { message: "You are Already registered", type: "error" },
                    { status: 409 }
                );
            }

            // Create The User
            const newUser = new Faculty({ userId, department, name, email, password });
            await newUser.save();

            // create response
            response = NextResponse.json(
                { message: "Signed up Successfully", type: 'success' },
                { status: 200 }
            );
        }
        else {

            // Check if User already exist
            const user = await Student.findOne({ $or: [{ email }, { userId }] });
            if (user) {
                return NextResponse.json(
                    { message: "You are Already registered", type: "error" },
                    { status: 409 }
                );
            }

            // Create The User
            const newUser = new Student({ userId, department, name, email, password });
            await newUser.save();

            // create response
            response = NextResponse.json(
                { message: "Signed up Successfully", type: 'success' },
                { status: 200 }
            );
        }

        // return response
        return response;


    } catch (error) {
        return NextResponse.json(
            { type: "error", message: error.message },
            { status: 500 }
        );
    }
}