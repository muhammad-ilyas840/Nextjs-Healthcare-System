import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import DoctorModel from '@/models/Doctors'
import UserModel from '@/models/User'
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import DoctorValidation from '@/validations/DoctorValidation'

export async function POST(request) {
    try {
        await dbConnect()

        const body = await request.json()
        const {error} = DoctorValidation(body)

         if (error) {
             console.log("Joi Validation Error:", error.details);
            return NextResponse.json(
                {
                    message: "Bad request",
                    error: error.details
                },
                {
                    status: 400
                }
            );
        } 


        const {fullname , email , password , specialization , gender , experience , hospital , consultationFee , address} = body
        const existingUser = await UserModel.findOne({email})
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password , 10)

         const user = await UserModel.create({
            fullname,
            email,
            password: hashedPassword,
            role: "Doctor"
    });

    await DoctorModel.create({
      User: user._id,
      specialization,
      gender,
      experience,
      hospital,
      consultationFee,
      address
    });
    return NextResponse.json({ message: "Doctor registered successfully" }, { status: 201 });

    } catch (err) {
      console.log(err)
        return NextResponse.json(
      { message: "Internal server error", error: err.message }, 
      { status: 500 }
    );
    }
}