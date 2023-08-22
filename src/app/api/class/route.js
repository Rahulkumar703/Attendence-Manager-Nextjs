import connect from "@/db/config";
import Subject from "@/models/Subject";
import Faculty from "@/models/Faculty";
import { NextResponse } from "next/server";
import Student from "@/models/Student";

connect();


export async function POST(req) {

    try {

        // Getting Request Body Data
        const reqBody = await req.json();
        const { faculty, subject } = reqBody

        // Validating Request Body Data
        if (!faculty || !subject) {
            return NextResponse.json(
                {
                    message: "Fill all details correctly",
                    type: "error"
                }
            )
        }

        // Check if Subject is Already Assigned
        const isAssigned = await Faculty.findOne({ subjects: subject })

        if (isAssigned)
            return NextResponse.json(
                { message: `Subject is already Assigned to ${isAssigned.name}`, type: 'info', data: isAssigned },
                { status: 409 }
            )

        // Fetch Subject
        const dbSubject = await Subject.findById(subject);

        // Add Faculty to the Subject
        const SubjectResponse = await Subject.updateOne(
            { _id: subject },
            { $set: { faculty } }
        );
        const FacultyResponse = await Faculty.updateOne(
            { _id: faculty },
            { $addToSet: { subjects: subject } }
        );
        const StudentResponse = await Student.updateMany(
            {
                $and: [
                    { semester: dbSubject.semester },
                    { department: dbSubject.department }
                ]
            },
            { $addToSet: { classes: { subject, faculty } } });

        if (SubjectResponse.modifiedCount && FacultyResponse.modifiedCount && StudentResponse.modifiedCount)
            return NextResponse.json(
                { message: 'Class Assigned successfully.', type: 'success' },
                { status: 200 }
            )
        else
            return NextResponse.json(
                { message: 'Failed to Assign class. try again', type: 'error' },
                { status: 400 }
            )

    } catch (error) {
        return NextResponse.json(
            { message: error.message, type: 'error' },
            { status: 500 }
        )
    }
}


export async function DELETE(req) {
    try {
        // Getting Request Body Data
        const reqBody = await req.json();
        const { faculty, subject } = reqBody;


        // Validating Request Body Data
        if (!faculty || !subject) {
            return NextResponse.json(
                {
                    message: "Fill all details correctly",
                    type: "error"
                }
            )
        }

        // Fetch Subject
        const dbSubject = await Subject.findById(subject);

        // Remove Faculty to the Subject
        const SubjectResponse = await Subject.updateOne(
            { _id: subject },
            { $unset: { faculty: 1 } }
        );
        const FacultyResponse = await Faculty.updateOne(
            { _id: faculty },
            { $pull: { subjects: subject } }
        );

        const StudentResponse = await Student.updateMany(
            {
                $and: [
                    { semester: dbSubject.semester },
                    { department: dbSubject.department }
                ]
            },
            { $pull: { classes: { subject, faculty } } });



        if (SubjectResponse.modifiedCount && FacultyResponse.modifiedCount && StudentResponse.modifiedCount)
            return NextResponse.json(
                { message: 'Class Removed successfully.', type: 'success' },
                { status: 200 }
            )
        else
            return NextResponse.json(
                { message: 'Failed to Remove class. try again', type: 'error' },
                { status: 400 }
            )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: 'error' },
            { status: 500 }
        )
    }
}

export async function PUT(req) {
    try {
        // Getting Request Body Data
        const reqBody = await req.json();
        const { faculty, subject } = reqBody;


        // Validating Request Body Data
        if (!faculty || !subject) {
            return NextResponse.json(
                {
                    message: "Fill all details correctly",
                    type: "error"
                }
            )
        }
        // Fetch Subject
        const dbSubject = await Subject.findById(subject);

        // Remove Previous Faculty Subject
        const SubjectRemoved = await Faculty.updateMany({ subjects: subject }, { $pull: { subjects: subject } })

        // Update New Faculty to the Subject
        if (SubjectRemoved) {
            const subjectResponse = await Subject.updateOne(
                { _id: subject },
                { $set: { faculty } }
            );
            const FacultyResponse = await Faculty.updateOne(
                { _id: faculty },
                { $addToSet: { subjects: subject } }
            );
            const StudentResponse = await Student.updateMany(
                {
                    $and: [
                        { semester: dbSubject.semester },
                        { department: dbSubject.department },
                        { "classes.subject": subject }
                    ]
                },
                { $set: { "classes.$.faculty": faculty } }
            );


            if (subjectResponse.modifiedCount && FacultyResponse.modifiedCount && StudentResponse.modifiedCount)
                return NextResponse.json(
                    { message: 'Class Updated successfully.', type: 'success' },
                    { status: 200 }
                )
            else
                return NextResponse.json(
                    { message: 'Failed to Update class. try again', type: 'error' },
                    { status: 400 }
                )
        }
        return NextResponse.json(
            { message: 'Failed to Update class. try again', type: 'error' },
            { status: 400 }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: 'error' },
            { status: 500 }
        )
    }
}