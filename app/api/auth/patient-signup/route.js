import bcrypt from 'bcrypt'
import PatientModel from '@/models/Patients'
import UserModel from '@/models/User'
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import PatientValidation from '@/validations/PatientValidation';

export async function POST(request) {
    try {
        await dbConnect()

        const body = await request.json()
        const {error} = PatientValidation(body)
        if (error) {
            console.log("Joi Validation Error:", error.details);
            return NextResponse.json(
                {
                    message: "Bad request",
                    error: error.details[0].message
                },
                {
                    status: 400
                }
            );
        }

        const {fullname , email , password , age , gender , bloodgroup , address} = body
        const existingUser = await UserModel.findOne({email})
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password , 10)

         const user = await UserModel.create({
            fullname,
            email,
            password: hashedPassword,
            role: "Patient"
    });

    await PatientModel.create({
      User: user._id,
      age,
      gender,
      bloodgroup,
      address
    });
    return NextResponse.json({ message: "Patient registered successfully" }, { status: 201 });

    } catch (err) {
      console.log(err)
      return NextResponse.json(
      { message: "Internal server error", error: err.message }, 
      { status: 500 }
    );
    }
}