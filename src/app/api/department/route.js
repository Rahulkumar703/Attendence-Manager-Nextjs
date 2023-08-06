import connect from "@/db/config";
import Department from "@/models/Department";
import { NextResponse } from "next/server";



export async function GET() {

    try {
        connect();
        // Getting Department data
        const response = await Department.find();
        return NextResponse.json({ type: 'success', message: 'department fetched successfully.', department: response }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message, type: 'error' }, { status: 500 })
    }

}


export async function POST(req) {

    try {
        connect();

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