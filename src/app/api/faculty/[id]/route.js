import Faculty from "@/models/Faculty";
import { connect } from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {

    try {
        connect();
        const { id } = await params;

        const response = await Faculty.findById(id);
        if (response)
            return NextResponse.json(
                { message: 'Faculty Fetched Successfully', type: 'success', data: response },
                { status: 200 }
            );
        else return NextResponse.json(
            { message: 'Faculty Not Found', type: 'error' },
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
