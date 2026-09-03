import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {

    const role = request.cookies.get("role")?.value;
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;


    // Check token if it exists
    let isValidToken = false;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            isValidToken = true;
        } catch (error) {
            isValidToken = false;
        }
    }


    // If token is expired/invalid, remove cookies
    if (token && !isValidToken) {

        const response = NextResponse.redirect(
            new URL("/Login", request.url)
        );

        response.cookies.delete("token");
        response.cookies.delete("role");

        return response;
    }


    // Homepage
    // Send already logged-in users to their dashboard
    if (pathname === "/") {

        if (isValidToken && role === "Patient") {
            return NextResponse.redirect(
                new URL("/patientdashboard", request.url)
            );
        }

        if (isValidToken && role === "Doctor") {
            return NextResponse.redirect(
                new URL("/doctordashboard", request.url)
            );
        }

        return NextResponse.redirect(
            new URL("/Login", request.url)
        );
    }


    // Logged-in Patient shouldn't visit auth pages
    if (isValidToken && role === "Patient") {

        if (
            pathname === "/Login" ||
            pathname === "/PatientSignup" ||
            pathname === "/DoctorSignup"
        ) {
            return NextResponse.redirect(
                new URL("/patientdashboard", request.url)
            );
        }
    }


    // Logged-in Doctor shouldn't visit auth pages
    if (isValidToken && role === "Doctor") {

        if (
            pathname === "/Login" ||
            pathname === "/PatientSignup" ||
            pathname === "/DoctorSignup"
        ) {
            return NextResponse.redirect(
                new URL("/doctordashboard", request.url)
            );
        }
    }


    // Patient dashboard protection
    if (pathname.startsWith("/patientdashboard")) {

        if (!isValidToken || role !== "Patient") {
            return NextResponse.redirect(
                new URL("/unauthorized", request.url)
            );
        }
    }


    // Doctor dashboard protection
    if (pathname.startsWith("/doctordashboard")) {

        if (!isValidToken || role !== "Doctor") {
            return NextResponse.redirect(
                new URL("/unauthorized", request.url)
            );
        }
    }


    return NextResponse.next();
}


export const config = {
    matcher: [
        "/",
        "/Login",
        "/PatientSignup",
        "/DoctorSignup",
        "/patientdashboard/:path*",
        "/doctordashboard/:path*"
    ]
};