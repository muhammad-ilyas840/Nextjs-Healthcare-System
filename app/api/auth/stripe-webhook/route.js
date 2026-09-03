import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/models/Appointment";
import PaymentModel from "@/models/Payment";

const stripe = new Stripe(process.env.Stripe_secret_key)

export async function POST(request) {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')
    let event
    try{
        event = stripe.webhooks.constructEvent(
            body,
            sig ,
            process.env.Stripe_webhook_secret
        )

    } catch(err){
        console.log(err)
        return NextResponse.json({message : "Webhook error"} , {status : 400})
    }

        if(event.type === "checkout.session.completed"){
            try{
                const session = event.data.object
                const appointmentId = session.metadata.appointmentId
                const patientId = session.metadata.patientId
                await dbConnect()

                const appointment = await AppointmentModel.findById(appointmentId)
                if (!appointment) {
                return NextResponse.json(
                    { message: "Appointment not found" },
                    { status: 404 }
                );
            }

            const existingPayment =
                await PaymentModel.findOne({
                    Appointment: appointmentId,
                    paymentStatus: "Paid"
                })

            if (existingPayment) {
                console.log("Payment already exists")
                return NextResponse.json({message : "Payment already paid"} , {status : 200})
            }

             await PaymentModel.create({

                Appointment: appointmentId,

                Patient: patientId,

                Doctor : appointment.Doctor,

                amount: session.amount_total / 100,

                paymentMethod: "Card",

                transactionId: session.payment_intent,

                paymentStatus: "Paid"
            })

            console.log("Payment saved successfully")

        }
        catch(err){

            return NextResponse.json({message : "Internal server error" , error:err.message}  , {status:500})
        }

    }

    return NextResponse.json(
        { received: true },
        { status: 200 }
    );
}