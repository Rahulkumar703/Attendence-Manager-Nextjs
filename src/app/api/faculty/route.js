import Faculty from "@/models/Faculty";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        connect();
        const response = await Faculty.find();
        if (response)
            return NextResponse.json({ message: 'Faculties Fetched Successfully', type: 'success', data: response }, { status: 200 });
        else return NextResponse.json({ message: 'No faculties Found', type: 'error' }, { status: 404 });
    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function POST(req) {


    try {
        connect();

        const reqBody = await req.json();
        const { userId, department, name, email, password } = reqBody;

        // Check if User already exist
        const user = await Faculty.findOne({ $or: [{ email }, { userId }] });
        if (user) {
            return NextResponse.json(
                { message: "Faculty is Already Added", type: "info" },
                { status: 409 })
        }

        // Create The User
        const newUser = new Faculty({ userId, department, name, email, password });
        await newUser.save();

        // returning response
        return NextResponse.json(
            { message: "Faculty Added Successfully", type: 'success' },
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