import dbConnect from "@/lib/dbConnect";
import PatientModel from "@/models/Patients";
import DoctorModel from "@/models/Doctors";
import AppointmentModel from "@/models/Appointment";
import { ensureAuthenticated } from "@/lib/Auth";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const { doctorId } = await params;
        await dbConnect();
        const token = request.cookies.get("token")?.value;

        const user = ensureAuthenticated(token);

        if (!user) {
            return NextResponse.json(
                { message: "User not authorized" },
                { status: 401 }
            );
        }
        if (user.role !== "Patient") {
            return NextResponse.json(
                { message: "Only patients can book appointments" },
                { status: 403 }
            );
        }

        const doctor = await DoctorModel.findById(doctorId);
        if (!doctor) {
            return NextResponse.json(
                { message: "Doctor not found" },
                { status: 404 }
            );
        }

        const patient = await PatientModel.findOne({
            User: user.id
        });
        if (!patient) {
            return NextResponse.json(
                { message: "Patient profile not found" },
                { status: 404 }
            );
        }

        const { reason, appointmentDate , status } = await request.json();
        if (!reason || !appointmentDate) {
            return NextResponse.json(
                { message: "Reason and appointment date are required" },
                { status: 400 }
            );
        }

        const appointment = await AppointmentModel.create({
            Patient: patient._id,
            Doctor: doctor._id,
            reason,
            appointmentDate,
            status
        });

        return NextResponse.json(
            {message: "Appointment booked successfully",appointment},
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}