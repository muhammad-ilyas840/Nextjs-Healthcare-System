import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/models/Appointment";
import Stripe from 'stripe'
import { ensureAuthenticated } from "@/lib/Auth";
import PaymentModel from "@/models/Payment";

const stripe = new Stripe(process.env.Stripe_secret_key)

export async function POST(request , {params}) {
    try {
        await dbConnect()
        const {appointmentId} = await params
        const token = request.cookies.get("token")?.value;
        const user = ensureAuthenticated(token);
        if (!user) {
            return NextResponse.json(
                { message: "User not authorized" },
                { status: 401 }
            );
        }

        if (user.role !== "Patient") {
            return NextResponse.json(
                { message: "Only patients can make payments" },
                { status: 403 }
            );
        }

        const appointment = await AppointmentModel.findById(appointmentId)
        .populate({
            path : "Doctor",
            populate : {
                path : "User",
                select : "fullname"
            }
        })
        if (!appointment) {
            return NextResponse.json(
                { message: "Appointment not found" },
                { status: 404 }
            );
        }

        if (appointment.status !== "Completed") {
            return NextResponse.json({message: "Only completed appointments can be paid" },{ status: 400 });
        }
        const existingPayment = await PaymentModel.findOne({
            Appointment : appointmentId,
            paymentStatus : "Paid"
        })
        if(existingPayment){
            return NextResponse.json({ message: "Payment already paid" },{ status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"] ,
            line_items : [
                {
                    price_data : {
                        currency : 'usd',
                        product_data : {
                            name : `Appointment with Dr. ${appointment.Doctor.User.fullname}`,
                        } ,
                        unit_amount : appointment.Doctor.consultationFee * 100
                    } ,
                    quantity : 1
                }
            ] ,
            mode : 'payment',

            success_url:
            `${request.nextUrl.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
            `${request.nextUrl.origin}/patientappointments`,

            metadata: {
                appointmentId: appointment._id.toString(),
                patientId: appointment.Patient._id.toString()
            },
        })

        return NextResponse.json(
            {
                url: session.url
            },
            { status: 200 }
        );

    } catch (err) {
         console.log(err);

        return NextResponse.json(
            {
                message: "Unable to create checkout session"
            },
            { status: 500 }
        );
    }
}
