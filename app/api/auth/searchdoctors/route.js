import DoctorModel from "@/models/Doctors";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function GET(request) {
    try {
        await dbConnect()
        const {searchParams} = new URL(request.url)
        const search = searchParams.get("search")
        const page = parseInt(searchParams.get("page")) || 1 // this line and below 2 lines are for pagination
        const limit = parseInt(searchParams.get("limit")) || 6
        const skip = (page - 1) * limit

        const user = await UserModel.find({
            fullname : {
                $regex : search,
                $options : 'i'
            } ,
            role : "Doctor"
        })
        const userIds = user.map(user=>user._id)
        const doctor = await DoctorModel.find({
            $or : [
                {
                    User : {
                        $in : userIds
                    }
                } ,
                {
                    specialization : {
                        $regex : search,
                        $options : 'i'
                    }
                }
            ]
    }).populate("User" , "fullname email")
    .skip(skip).limit(limit) //this is just for pagination

    return NextResponse.json(doctor , {status : 200})

    } catch (err) {
        return NextResponse.json({message : "Internal server error"} , {status : 500})
    }
}