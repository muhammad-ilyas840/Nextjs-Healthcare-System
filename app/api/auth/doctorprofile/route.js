import { ensureAuthenticated } from "@/lib/Auth";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import DoctorModel from "@/models/Doctors";

export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token)

        const doctor = await DoctorModel.findOne({User : user.id})
        .populate("User" , "fullname email")
        if(!doctor){
            return NextResponse.json({message : "Doctor not found"} , {status : 404})
        }

        return NextResponse.json(doctor , {status : 200})
    } catch (err) {
        return NextResponse.json({message : "Internal server error"} , {status : 500})
    }
}