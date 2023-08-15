import Subject from "@/models/Subject";
import connect from "@/db/config";
import { NextResponse } from "next/server";

connect();

export async function GET(req, { params }) {

    try {
        const { semester } = await params;


        const response = await Subject.find({ semester });
        if (response)
            return NextResponse.json(
                { message: 'Subject Fetched Successfully', type: 'success', subjects: response },
                { status: 200 }
            );
        else return NextResponse.json(
            { message: 'Subject Not Found', type: 'error' },
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
