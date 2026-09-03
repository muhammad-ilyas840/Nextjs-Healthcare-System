import { ensureAuthenticated } from "@/lib/Auth";
import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/models/Appointment";
import DoctorModel from "@/models/Doctors";
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

            if (user.role !== "Doctor") {
                        return NextResponse.json(
                            { message: "Only doctor can update appointment status" },
                            { status: 403 }
                        );
                    }

            const doctor = await DoctorModel.findOne({User : user.id})
            if (!doctor) {
                return NextResponse.json({ message: "Doctor not found" } ,{ status : 404 })
                }

                const appointment = await AppointmentModel.findOne({
                    Doctor : doctor._id,
                    _id : appointmentId
                })

                if(!appointment){
                    return NextResponse.json({message : "This appointment doesn't belong to you"}
                        , {status : 403}
                    )
                }

                if(!["Confirmed" , "Cancelled" , "Completed"].includes(status)){
                    return NextResponse.json({
                        message : "Invalid status"
                    } , {status : 400})
                }

                if(appointment.status === "Cancelled" &&
                    status === "Confirmed"
                ) {
                    return NextResponse.json({
                        message : "Cancel appointment cannot be confirmed"
                    } , {status : 400 })
                }

                if(appointment.status === "Confirmed" &&
                    status === "Cancelled"
                ) {
                    return NextResponse.json({
                        message : "Confirmed appointment cannot be cancelled"
                    } , {status : 400})
                }

                if(appointment.status === "Completed" &&
                    status === "Cancelled"
                ) {
                    return NextResponse.json({
                        message : "Completed appointment cannot be cancelled"
                    } , {status : 400})
                }

                appointment.status = status
                await appointment.save()

                return NextResponse.json({
                        message : "Appointment status updated successfully"
                    } , {status : 200})
                
    } catch (err) {
        console.log(err)
        return NextResponse.json({
                        message : "Internal server error"
                    } , {status : 500})
    }
}