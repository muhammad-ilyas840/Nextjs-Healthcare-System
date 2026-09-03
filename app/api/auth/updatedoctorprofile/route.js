import { ensureAuthenticated } from "@/lib/Auth"
import { NextResponse } from "next/server"
import DoctorModel from "@/models/Doctors"

export async function PUT(request) {
    try {
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token)
        const body = await request.json()
        if(!user){
            return NextResponse.json({message : "User not authorized"} , {status : 403})
        }
        const doctor = await DoctorModel.findOneAndUpdate(
            {User : user.id},
            body,
            {new : true}
        )
        if(!doctor){
            return NextResponse.json({message : "Doctor profile not found"} , {status : 404})
        }

        return NextResponse.json({message : "Doctor profile updated successfully"} , {status : 400})

    } catch (err) {
        console.log(err)
        return NextResponse.json({message : "Internal server error"} , {status : 500})
    }
}