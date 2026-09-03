import { ensureAuthenticated } from "@/lib/Auth";
import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/models/Appointment";
import PatientModel from "@/models/Patients";
import { NextResponse } from "next/server";

export async function PATCH(request , {params}) {
    try {
        await dbConnect()
        const {appointmentId} = await params
        const {status} = await request.json()
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token);
        if (!user) {
            return NextResponse.json(
                { message: "User not authorized" },{ status: 401 });
            }

            if (user.role !== "Patient") {
                        return NextResponse.json(
                            { message: "Only Patient can update appointment status" },
                            { status: 403 }
                        );
                    }

            const patient = await PatientModel.findOne({User : user.id})
            if (!patient) {
                return NextResponse.json({ message: "Patient not found" } ,{ status : 404 })
                }

                const appointment = await AppointmentModel.findOne({
                    Patient : patient._id,
                    _id : appointmentId
                })

                if(!appointment){
                    return NextResponse.json({message : "This appointment doesn't belong to you"}
                        , {status : 403}
                    )
                }

                if(!status === "Cancelled"){
                    return NextResponse.json({
                        message : "Patient can only cancel appointment"
                    } , {status : 400})
                }

                 if(appointment.status === "Cancelled") {
                    return NextResponse.json({
                        message : "Appointment already cancelled"
                    } , {status : 400 })
                }

                if(appointment.status === "Completed") {
                    return NextResponse.json({
                        message : "Completed appointment cannot be cancelled"
                    } , {status : 400 })
                }

                appointment.status = "Cancelled"
                await appointment.save()

                return NextResponse.json({
                        message : "Appointment Cancelled successfully successfully"
                    } , {status : 200})
                
    } catch (err) {
        console.log(err)
        return NextResponse.json({
                        message : "Internal server error"
                    } , {status : 500})
    }
}