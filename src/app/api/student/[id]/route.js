import Student from "@/models/Student";
import connect from "@/db/config";
import { NextResponse } from "next/server";

connect();

export async function GET(req, { params }) {

    try {
        const { id } = await params;

        const response = await Student.findById(id);
        if (response)
            return NextResponse.json(
                { message: 'Student Fetched Successfully', type: 'success', data: response },
                { status: 200 }
            );
        else return NextResponse.json(
            { message: 'Student Not Found', type: 'error' },
            { status: 404 }
        );
    }
    catch (error) {
        return NextResponse.json(
            { type: "error", message: error.message },
            { status: 500 }
        );
    }
}
