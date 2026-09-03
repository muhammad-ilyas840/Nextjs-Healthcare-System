import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import DoctorModel from "@/models/Doctors";
import AppointmentModel from "@/models/Appointment";
import { ensureAuthenticated } from "@/lib/Auth";
import PaymentModel from "@/models/Payment";

export async function GET(request) {
    try {
        await dbConnect()

        const token = request.cookies.get("token")?.value;
        const user = ensureAuthenticated(token);
        if (!user) {
            return NextResponse.json(
                { message: "User not authorized" },
                { status: 401 }
            );
        }
        const doctor = await DoctorModel.findOne({
            User: user.id
        })
        if (!doctor) {
            return NextResponse.json(
                { message: "Doctor not found" },
                { status: 404 }
            );
        }

        const appointments = await AppointmentModel.find({
            Doctor: doctor._id
        });

        const payments = await PaymentModel.find({
            Doctor : doctor._id,
        })

        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );
        const startOfYesterday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 1
        );

        const todayAppointments = appointments.filter((appointment) => {
            return (
                appointment.appointmentDate >= startOfDay &&
                appointment.appointmentDate < endOfDay
            );
        });

        const yesterdayAppointments = appointments.filter((appointment) => {
            return (
                appointment.appointmentDate >= startOfYesterday &&
                appointment.appointmentDate < startOfDay
            );
        });

        const previousAppointments = appointments.filter((appointment) => {
            return appointment.appointmentDate < startOfYesterday;
        });

        const pendingAppointments = appointments.filter(
            (appointment) => appointment.status === "Pending"
        );

        const confirmedAppointments = appointments.filter(
            (appointment) => appointment.status === "Confirmed"
        );

        const completedAppointments = appointments.filter(
            (appointment) => appointment.status === "Completed"
        );

        const cancelledAppointments = appointments.filter(
            (appointment) => appointment.status === "Cancelled"
        );

        const pendingPayments = payments.filter(
            (payment)=>payment.paymentStatus === "Pending"
        )

        const paidPayments = payments.filter(
            (payment)=>payment.paymentStatus === "Paid"
        )

        return NextResponse.json(
            {
                yesterdayAppointments: yesterdayAppointments.length,
                previousAppointments: previousAppointments.length,
                todayAppointments: todayAppointments.length,

                pendingAppointments: pendingAppointments.length,
                confirmedAppointments: confirmedAppointments.length,
                completedAppointments: completedAppointments.length,
                cancelledAppointments: cancelledAppointments.length,
                pendingPayments : pendingPayments.length,
                paidPayments : paidPayments.length,

                totalAppointments: appointments.length
            },
            { status: 200 }
        );

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            {
                message: "Error while getting appointment statistics",
                error: err.message
            },
            { status: 500 }
        );
    }
}