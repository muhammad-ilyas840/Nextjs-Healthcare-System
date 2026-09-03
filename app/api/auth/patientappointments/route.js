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
        if (user.role !== "Patient") {
            return NextResponse.json(
                { message: "Unauthorized" },{ status: 403 });
            }

            const patient = await PatientModel.findOne({User : user.id})
            if(!patient){
                return NextResponse.json(
                    { message: "Patient profile not found" },{ status: 404 });
                }

                const appointment = await AppointmentModel.find({Patient : patient._id})
                .populate({
                    path: "Doctor",
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