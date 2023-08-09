import Department from "@/models/Department";
import Faculty from "@/models/Faculty";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

connect();

export async function GET() {

    try {
        let response = await Faculty.find();
        if (response) {
            const data = await Promise.all(response.map(async (res) => {
                const department = await Department.findById(res.department);
                return { ...res._doc, department };
            }));

            return NextResponse.json({ message: 'Faculties Fetched Successfully', type: 'success', data: data }, { status: 200 });
        }
        else return NextResponse.json({ message: 'No faculties Found', type: 'error' }, { status: 404 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function POST(req) {


    try {
        const reqBody = await req.json();
        const { userId, department, name, email, password } = reqBody;


        // validating Request body
        if (!userId || !department || !name || !email || !password) {
            return NextResponse.json(
                { message: "Fill all details correctly", type: "error" },
                { status: 400 }
            );
        }

        // Check if User already exist
        const user = await Faculty.findOne({ $or: [{ email }, { userId }] });
        if (user) {
            return NextResponse.json(
                { message: "Faculty is Already Added", type: "info" },
                { status: 409 })
        }

        // Create The User
        let newUser = new Faculty({ userId, department, name, email, password });
        await newUser.save();

        const userDepartnemt = await Department.findById(newUser.department);
        newUser = { ...newUser._doc, department: userDepartnemt };

        delete newUser.password;

        // returning response
        return NextResponse.json(
            { message: "Faculty Added Successfully", type: 'success', data: newUser },
            { status: 200 }
        );

    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        connect();

        const reqBody = await req.json();
        const { userId } = reqBody;

        // Check if User exist
        const user = await Faculty.findOne({ userId });

        if (!user) {
            return NextResponse.json(
                { message: "Faculty Not Found", type: "error" },
                { status: 404 }
            );
        }

        // Delete The User
        const deletedUser = await Faculty.deleteOne({ userId })

        // returning response
        if (deletedUser)
            return NextResponse.json({
                message: "Faculty Deleted Successfully", type: 'success'
            }, { status: 200 });

    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}