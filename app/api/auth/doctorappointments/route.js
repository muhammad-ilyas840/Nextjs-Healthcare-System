import PatientModel from '@/models/Patients'
import AppointmentModel from '@/models/Appointment'
import DoctorModel from '@/models/Doctors'
import UserModel from '@/models/User'
import { ensureAuthenticated } from '@/lib/Auth'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'

export async function GET(request) {
    try{
        await dbConnect()
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token)
        if (!user) {
            return NextResponse.json(
                { message: "User not authorized" },{ status: 401 });
            }
            if (user.role !== "Doctor") {
                return NextResponse.json(
                    { message: "Authorized" },{ status: 403 });
                }
                
                const doctor = await DoctorModel.findOne({User : user.id})
                if(!doctor){
                    return NextResponse.json(
                        { message: "Patient profile not found" },{ status: 404 });
                    }

                const appointment = await AppointmentModel.find({Doctor : doctor._id})
                .populate({
                    path: "Patient",
                    populate: {
                        path: "User",
                        select: "fullname email"
                    }
                });

                if(appointment.length === 0){
                    return NextResponse.json({message : "No appointments yet"} , {status : 403})
                }

                return NextResponse.json(appointment , {status : 200})
            } 
            catch(err){
                console.log(err)
                return NextResponse.json({message : "Internal server error"} , {status : 500}) 
            }
}