import connect from "@/db/config";
import Subject from "@/models/Subject";
import Faculty from "@/models/Faculty";
import { NextResponse } from "next/server";

connect();


export async function POST(req) {

    try {

        // Getting Request Body Data
        const reqBody = await req.json();
        const { faculty, subject } = reqBody

        // Validating Request Body Data
        if (!faculty || !subject) {
            return NextResponse.json({ message: "Fill all details correctly", type: "error" })
        }

        // Check if Subject is Already Assigned
        const isAssigned = await Faculty.findOne({ subjects: subject })

        if (isAssigned)
            return NextResponse.json({ message: `Subject is already Assigned to ${isAssigned.name}`, type: 'info', data: isAssigned }, { status: 403 })

        // Add Faculty to the Subject
        const subjectResponse = await Subject.updateOne({ _id: subject }, { $set: { faculty } });
        const Facultysponse = await Faculty.updateOne({ _id: faculty }, { $addToSet: { subjects: subject } });
        if (subjectResponse && Facultysponse)
            return NextResponse.json({ message: 'Class Assigned successfully.', type: 'success' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        // Getting Request Body Data
        const reqBody = await req.json();
        const { faculty, subject } = reqBody;


        // Validating Request Body Data
        if (!faculty || !subject) {
            return NextResponse.json({ message: "Fill all details correctly", type: "error" })
        }

        // Remove Faculty to the Subject
        const subjectResponse = await Subject.updateOne({ _id: subject }, { $unset: { faculty: 1 } });
        const Facultysponse = await Faculty.updateOne({ _id: faculty }, { $pull: { subjects: subject } });


        if (subjectResponse.modifiedCount && Facultysponse.modifiedCount)
            return NextResponse.json({ message: 'Class Removed successfully.', type: 'success' }, { status: 200 })
        else
            return NextResponse.json({ message: 'Failed to Remove class. try again', type: 'error' }, { status: 400 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        // Getting Request Body Data
        const reqBody = await req.json();
        const { faculty, subject } = reqBody;


        // Validating Request Body Data
        if (!faculty || !subject) {
            return NextResponse.json({ message: "Fill all details correctly", type: "error" })
        }
        // Remove Previous Faculty Subject
        const subjectRemoved = await Faculty.updateMany({ subjects: subject }, { $pull: { subjects: subject } })

        // Update New Faculty to the Subject
        if (subjectRemoved) {
            const subjectResponse = await Subject.updateOne({ _id: subject }, { $set: { faculty } });
            const Facultysponse = await Faculty.updateOne({ _id: faculty }, { $addToSet: { subjects: subject } });


            if (subjectResponse.modifiedCount && Facultysponse.modifiedCount)
                return NextResponse.json({ message: 'Class Updated successfully.', type: 'success' }, { status: 200 })
            else
                return NextResponse.json({ message: 'Failed to Update class. try again', type: 'error' }, { status: 400 })
        }
        return NextResponse.json({ message: 'Failed to Update class. try again', type: 'error' }, { status: 400 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }
}