"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
    const router = useRouter();

    const [paymentData, setPaymentData] = useState([]);

    const fetchPayment = async () => {
        try {
            const { appointmentId } = await params;

            const response = await fetch(
                `/api/auth/paymentdata/${appointmentId}`
            );

            const data = await response.json();

            if (response.ok) {
                setPaymentData(data);
            } else {
                alert(data.message);
            }

        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchPayment();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">
                            MediCare
                        </h1>

                        <p className="text-xs text-slate-500">
                            Doctor Portal
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/DoctorAppointments")}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Back to Appointments
                    </button>

                </div>
            </nav>


            {/* Main */}
            <main className="max-w-5xl mx-auto px-6 py-10">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Payment Record
                    </h2>

                    <p className="text-slate-500 mt-2">
                        View the payment information for this appointment.
                    </p>
                </div>


                {paymentData.length === 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">

                        <div className="text-5xl mb-4">
                            💳
                        </div>

                        <h3 className="text-xl font-semibold text-slate-700">
                            No payment record found
                        </h3>

                        <p className="text-slate-500 mt-2">
                            This appointment does not have a payment record yet.
                        </p>

                    </div>
                )}


                {paymentData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {paymentData.map((payment) => (

                            <div
                                key={payment._id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
                            >

                                {/* Header */}
                                <div className="bg-emerald-600 p-6 text-white">

                                    <div className="flex items-center gap-4">

                                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                            💳
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Payment Details
                                            </h3>

                                            <p className="text-emerald-100 text-sm">
                                                Appointment Payment
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                {/* Payment information */}
                                <div className="p-6 space-y-5">

                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">
                                            Patient
                                        </p>

                                        <p className="font-semibold text-slate-700 mt-1">
                                            {payment.Patient?.User?.fullname}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">
                                            Patient Email
                                        </p>

                                        <p className="font-medium text-slate-700 mt-1">
                                            {payment.Patient?.User?.email}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">
                                            Amount
                                        </p>

                                        <p className="text-2xl font-bold text-emerald-600 mt-1">
                                            Rs. {payment.amount}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">
                                            Payment Method
                                        </p>

                                        <p className="font-medium text-slate-700 mt-1">
                                            {payment.paymentMethod}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">
                                            Transaction ID
                                        </p>

                                        <p className="font-medium text-slate-700 mt-1 break-all">
                                            {payment.transactionId}
                                        </p>
                                    </div>


                                    <div className="border-t border-slate-100 pt-5">

                                        <p className="text-xs text-slate-400 uppercase font-semibold mb-2">
                                            Payment Status
                                        </p>

                                        <span className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                                            {payment.paymentStatus}
                                        </span>

                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">
                                            Payment Date
                                        </p>

                                        <p className="font-medium text-slate-700 mt-1">
                                            {new Date(
                                                payment.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </main>

        </div>
    );
};

export default page;