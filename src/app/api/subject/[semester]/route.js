import Subject from "@/models/Subject";
import connect from "@/db/config";
import { NextResponse } from "next/server";
import Faculty from "@/models/Faculty";

connect();

export async function GET(req, { params }) {

    try {
        const { semester } = params;

        const subjects = await Subject.find({ semester })
            .populate({ path: 'faculty', model: Faculty })
            .sort({ name: -1 });

        if (subjects)
            return NextResponse.json(
                { message: 'Subject Fetched Successfully', type: 'success', subjects },
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
