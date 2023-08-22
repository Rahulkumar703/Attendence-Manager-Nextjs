import connect from "@/db/config";
import Department from "@/models/Department";
import { NextResponse } from "next/server";

connect();

export async function GET() {

    try {

        // Getting Department data
        const response = await Department.find().sort({ name: 1 });
        return NextResponse.json({ type: 'success', message: 'department fetched successfully.', departments: response }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }

}


export async function POST(req) {

    try {

        // Getting Request Body Data
        const reqBody = await req.json();
        const { name, code } = reqBody

        // Validating Request Body Data
        if (!name || !code) {
            return NextResponse.json({ message: "Fill all details correctly", type: "error" })
        }

        // Creating New Department
        const response = await Department.create({ name, code });
        return NextResponse.json({ message: 'Department added successfully.', type: 'success', department: response }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {

        const reqBody = await req.json();
        const { _id } = reqBody;

        // Check if Department exist
        const subject = await Department.findOne({ _id });

        if (!subject) {
            return NextResponse.json(
                { message: "Department Not Found", type: "error" },
                { status: 404 }
            );
        }

        // Delete The Department
        const deletedDepartment = await Department.deleteOne({ _id })

        // returning response
        if (deletedDepartment)
            return NextResponse.json({
                message: "Department Deleted Successfully", type: 'success'
            }, { status: 200 });

    }
    catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {

        const reqBody = await req.json();

        const updatedData = await Department.updateOne({ _id: reqBody._id }, reqBody);

        return NextResponse.json({
            message: "Department Updated Successfully", type: 'success', updatedData
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ type: "error", message: error.message }, { status: 500 });
    }
}