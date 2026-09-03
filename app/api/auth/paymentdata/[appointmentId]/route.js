import { ensureAuthenticated } from "@/lib/Auth"
import dbConnect from "@/lib/dbConnect"
import DoctorModel from "@/models/Doctors"
import { NextResponse } from "next/server"
import AppointmentModel from "@/models/Appointment"
import PaymentModel from "@/models/Payment"

export async function GET(request , {params}){
    try {
        const {appointmentId} = await params
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token)
        if(!user){
            return NextResponse.json({message : "User not authorized"} , {status : 403})
        }
        const doctor = await DoctorModel.findOne({User : user.id})
        if(!doctor){
            return NextResponse.json({message : "Doctor not found"} , {status : 404})
        }

        const appointment = await AppointmentModel.findOne({
            _id : appointmentId,
            Doctor : doctor._id
        })
         if(!appointment){
            return NextResponse.json({message : "This appointment doesn't belng to you"} , {status : 404})
        }

        const paymentData = await PaymentModel.find({
            Appointment : appointment._id
        }) .populate({
            path : "Patient",
            populate : {
                path : "User",
                select : "fullname email"
            }
        })

        
        return NextResponse.json(paymentData , {status : 200})
    } catch (err) {
        return NextResponse.json({message : "Internal server error"} , {status : 500})
    }
}