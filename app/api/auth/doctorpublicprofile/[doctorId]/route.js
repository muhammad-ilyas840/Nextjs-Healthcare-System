import DoctorModel from "@/models/Doctors";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ensureAuthenticated } from "@/lib/Auth";

export async function GET(request , {params}) {
    try {
        await dbConnect()
        const {doctorId} = await params
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token)
        if(!user){
            return NextResponse.json({message : "User not authorized"} , {status : 403})
        }
        
        const doctor = await DoctorModel.findById(doctorId)
        .populate({
            path: "User",
            select: "fullname email"
        });

        if(!doctor){
            return NextResponse.json({message : "Doctor not authorized"} , {status : 403})
        }
        
        return NextResponse.json(doctor , {status : 200})
    
    } catch (err) {
        console.log(err)
        return NextResponse.json({message : "Internal server error"} , {status : 500})
    }

}