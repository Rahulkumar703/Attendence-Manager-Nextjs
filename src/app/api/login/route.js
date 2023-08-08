import connect from "@/db/config";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import Faculty from "@/models/Faculty";
import Student from "@/models/Student";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { userId, password } = reqBody;


        // Validating Request Body
        if (!userId || !password) {
            return NextResponse.json(
                { message: "Fill all details correctly", type: "error" },
                { status: 400 }
            );
        }

        let response;

        // If Logging In a Faculty
        if (userId && userId.toString().length < 4) {

            // Check if user Exist
            const user = await Faculty.findOne({ userId }, { password: 1 });
            if (!user) {
                return NextResponse.json(
                    { message: "You are Not registered.", type: "warning" },
                    { status: 404 }
                );
            }


            // Verify Password
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) {
                return NextResponse.json(
                    { message: "Password not matched.", type: "error" },
                    { status: 400 }
                );
            }

            // create response
            response = NextResponse.json(
                { message: "Logged in Successfully", type: 'success' },
                { status: 200 }
            );
        }
        else {

            // Check if user Exist
            const user = await Student.findOne({ userId }, { password: 1 });
            if (!user) {
                return NextResponse.json(
                    { message: "You are Not registered.", type: "warning" },
                    { status: 404 }
                );
            }

            // Verify Password
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) {
                return NextResponse.json(
                    { message: "Password not matched.", type: "error" },
                    { status: 400 }
                );
            }

            // create response
            response = NextResponse.json(

                { message: "Logged in Successfully", type: 'success' },
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