import { ensureAuthenticated } from "@/lib/Auth";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import PatientModel from "@/models/Patients";

export async function GET(request) {
    try {
        await dbConnect();

        const token = request.cookies.get("token")?.value;

        const user = ensureAuthenticated(token);

        if (!user) {
            return NextResponse.json(
                { message: "User not authorized" },
                { status: 401 }
            );
        }

        const patient = await PatientModel.findOne({ User: user.id })
            .populate("User", "fullname email");

        if (!patient) {
            return NextResponse.json(
                { message: "Patient not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(patient, { status: 200 });

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}