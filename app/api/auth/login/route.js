import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Essential import
import LoginValidation from "@/validations/LoginValidation";

export async function POST(request) {
  try {
    await dbConnect();
    
    // In Next.js App Router, extract body using request.json()
    const body = await request.json()
    const {error} = LoginValidation(body)
     if (error) {
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

    const { email, password } = body

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password", success: false },
        { status: 401 }
      );
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return NextResponse.json(
        { message: "Invalid email or password", success: false },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { role: user.role, id: user._id },
      process.env.Jwt_secret, // Clean capitalized environmental variable
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
      token,
      fullname: user.fullname,
      role: user.role,
    },
    { status: 200 }
  );
  response.cookies.set("role", user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
});
  
  return response;
  
  } catch (err) {
    return NextResponse.json(
      console.log(err),
      { message: "Internal server error", error: err.message, success: false },
      { status: 500 }
    );
  }
}
