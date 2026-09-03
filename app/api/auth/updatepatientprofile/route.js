import { ensureAuthenticated } from "@/lib/Auth"
import { NextResponse } from "next/server"
import PatientModel from "@/models/Patients"

export async function PUT(request) {
    try {
        const token = request.cookies.get("token")?.value
        const user = ensureAuthenticated(token)
        const body = await request.json()
        if(!user){
            return NextResponse.json({message : "User not authorized"} , {status : 403})
        }
        const patient = await PatientModel.findOneAndUpdate(
            {User : user.id},
            body,
            {new : true}
        )
        if(!patient){
            return NextResponse.json({message : "Patient profile not found"} , {status : 404})
        }

        return NextResponse.json({message : "Patient profile updated successfully"} , {status : 200})

    } catch (err) {
        console.log(err)
        return NextResponse.json({message : "Internal server error"} , {status : 500})
    }
}