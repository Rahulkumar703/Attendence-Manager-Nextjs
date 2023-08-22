import Department from "@/models/Department";
import Subject from "@/models/Subject";
import connect from "@/db/config";
import { NextResponse } from "next/server";
import Faculty from "@/models/Faculty";

connect();

export async function GET() {

    try {
        let response = await Subject.find()
            .populate({ path: 'faculty', model: Faculty })
            .populate({ path: 'department', model: Department })
            .sort({ name: 1 });

        if (response) {
            return NextResponse.json({ message: 'Subjects Fetched Successfully', type: 'success', subjects: response }, { status: 200 });
        }
        else return NextResponse.json({ message: 'No Subjects Found', type: 'error' }, { status: 404 });
    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function POST(req) {

    try {
        const reqBody = await req.json();
        const { name, code, semester, department } = reqBody;


        // validating Request body
        if (!name || !code || !semester || !department) {
            return NextResponse.json(
                { message: "Fill all details correctly", type: "error" },
                { status: 400 }
            );
        }

        // Check if Subject already exist
        const subject = await Subject.findOne({ code });
        if (subject) {
            return NextResponse.json(
                { message: "Subject is Already Added", type: "info" },
                { status: 409 })
        }

        // Create The Subject
        let newSubject = new Subject({ name, code, semester, department });
        await newSubject.save();


        // returning response
        return NextResponse.json(
            { message: "Subject Added Successfully", type: 'success', subject: newSubject },
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
        const { _id } = reqBody;

        // Check if Subject exist
        const subject = await Subject.findOne({ _id });

        if (!subject) {
            return NextResponse.json(
                { message: "Subject Not Found", type: "error" },
                { status: 404 }
            );
        }

        // Delete The Subject
        const deletedSubject = await Subject.deleteOne({ _id })

        // returning response
        if (deletedSubject)
            return NextResponse.json({
                message: "Subject Deleted Successfully", type: 'success'
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

        const updatedData = await Subject.updateOne({ _id: reqBody._id }, reqBody);

        if (updatedData)
            return NextResponse.json({
                message: "Subject Updated Successfully", type: 'success'
            }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}