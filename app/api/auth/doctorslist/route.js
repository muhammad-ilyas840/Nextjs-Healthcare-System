import DoctorModel from "@/models/Doctors";
import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await dbConnect();

        const {searchParams} = new URL(request.url)
        const page = parseInt(searchParams.get("page")) || 1
        const limit = parseInt(searchParams.get("limit")) || 6
        const skip = (page - 1) * limit
        const totalDoctors = await DoctorModel.countDocuments()

        const totalPages = Math.ceil(totalDoctors/limit)

        const doctors = await DoctorModel
            .find()
            .populate("User", "fullname email").limit(limit).skip(skip)

        return NextResponse.json({
            doctors,
            totalDoctors,
            totalPages,
            currentPage : page,
        }, 
        { status: 200 });

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}