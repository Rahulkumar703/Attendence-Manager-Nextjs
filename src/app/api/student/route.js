import Department from "@/models/Department";
import Student from "@/models/Student";
import connect from "@/db/config";
import { NextResponse } from "next/server";

connect();

export async function GET() {

    try {
        let response = await Student.find().sort({ name: -1 });
        if (response) {
            const data = await Promise.all(response.map(async (res) => {
                const department = await Department.findById(res.department);
                return { ...res._doc, department };
            }));

            return NextResponse.json({ message: 'Students Fetched Successfully', type: 'success', students: data }, { status: 200 });
        }
        else return NextResponse.json({ message: 'No Students Found', type: 'error' }, { status: 404 });
    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function POST(req) {


    try {
        const reqBody = await req.json();
        const { userId, department, name, registration_number, password, semester } = reqBody;
        console.log(reqBody);


        // validating Request body
        if (!userId || !department || !name || !registration_number || !password) {
            return NextResponse.json(
                { message: "Fill all details correctly", type: "error" },
                { status: 400 }
            );
        }

        // Check if User already exist
        const user = await Student.findOne({ $or: [{ registration_number }, { userId }] });
        if (user) {
            return NextResponse.json(
                { message: "Student is Already Added", type: "info" },
                { status: 409 })
        }

        // Create The User
        let newUser = new Student({ userId, department, name, registration_number, password, semester });
        await newUser.save();

        const userDepartnemt = await Department.findById(newUser.department);
        newUser = { ...newUser._doc, department: userDepartnemt };

        delete newUser.password;

        // returning response
        return NextResponse.json(
            { message: "Student Added Successfully", type: 'success', student: newUser },
            { status: 200 }
        );

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        connect();

        const reqBody = await req.json();
        const { _id } = reqBody;

        // Check if User exist
        const user = await Student.findOne({ _id });

        if (!user) {
            return NextResponse.json(
                { message: "Student Not Found", type: "error" },
                { status: 404 }
            );
        }

        // Delete The User
        const deletedUser = await Student.deleteOne({ _id })

        // returning response
        if (deletedUser)
            return NextResponse.json({
                message: "Student Deleted Successfully", type: 'success'
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

        const updatedData = await Student.updateOne({ _id: reqBody._id }, reqBody);

        return NextResponse.json({
            message: "Student Updated Successfully", type: 'success', updatedData
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}