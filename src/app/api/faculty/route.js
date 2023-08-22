import Faculty from "@/models/Faculty";
import connect from "@/db/config";
import { NextResponse } from "next/server";
import Department from "@/models/Department";
import Subject from "@/models/Subject";

connect();

export async function GET() {

    try {
        let response = await Faculty.find()
            .populate([
                { path: 'department', model: Department },
                { path: 'subjects', model: Subject }
            ])
            .sort({ name: 1 });

        if (response) {

            return NextResponse.json({ message: 'Faculties Fetched Successfully', type: 'success', faculties: response }, { status: 200 });
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

        const savedUser = await Faculty.findById(newUser._id)
            .populate('department');

        if (savedUser) {
            // returning response
            return NextResponse.json(
                { message: "Faculty Added Successfully", type: 'success', faculty: savedUser },
                { status: 200 }
            );
        }

    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        connect();

        const reqBody = await req.json();
        const { _id } = reqBody;

        // Check if User exist
        const user = await Faculty.findOne({ _id });

        if (!user) {
            return NextResponse.json(
                { message: "Faculty Not Found", type: "error" },
                { status: 404 }
            );
        }

        // Delete The User
        const deletedUser = await Faculty.deleteOne({ _id })

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


export async function PUT(req) {
    try {
        connect();

        const reqBody = await req.json();

        delete reqBody.password;

        const updatedData = await Faculty.updateOne({ _id: reqBody._id }, reqBody);

        return NextResponse.json({
            message: "Faculty Updated Successfully", type: 'success', updatedData
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}