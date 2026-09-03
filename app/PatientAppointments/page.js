"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const [appointmentData, setAppointmentData] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("/api/auth/patientappointments", {
                method: "GET",
            });

            const data = await response.json();

            if (response.ok) {
                setAppointmentData(data);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateAppointment = async (appointmentId, status) => {
        try {
            let response = await fetch(`/api/auth/patientupdateappointment/${appointmentId}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: status })
            })
            let data = await response.json()
            if (response.ok) {
                alert(data.message)
            }
            else {
                alert(data.message)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    const handlePayment = async (appointmentId) => {

        try {

            const response = await fetch(
                `/api/auth/create-checkout-session/${appointmentId}`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            if (response.ok) {

                window.location.href = data.url;

            } else {

                alert(data.message);
            }

        } catch (err) {

            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">
                            MediCare
                        </h1>

                        <p className="text-xs text-slate-500">
                            Patient Portal
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/patientdashboard")}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Dashboard
                    </button>

                </div>
            </nav>


            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Heading */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-800">
                        My Appointments
                    </h2>

                    <p className="text-slate-500 mt-2">
                        View your appointments and doctor information.
                    </p>
                </div>


                {/* No Appointments */}
                {appointmentData.length === 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">

                        <div className="text-5xl mb-4">
                            📅
                        </div>

                        <h3 className="text-xl font-semibold text-slate-700">
                            No appointments yet
                        </h3>

                        <p className="text-slate-500 mt-2">
                            You haven't booked any appointments yet.
                        </p>

                        <button
                            onClick={() => router.push("/doctors")}
                            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Find a Doctor
                        </button>

                    </div>
                )}


                {/* Appointments */}
                {appointmentData.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {appointmentData.map((appointment) => (

                            <div
                                key={appointment._id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
                            >

                                {/* Doctor Header */}
                                <div className="bg-blue-600 p-6 text-white">

                                    <div className="flex items-center gap-4">

                                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                            👨‍⚕️
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Dr. {appointment.Doctor?.User?.fullname}
                                            </h3>

                                            <p className="text-blue-100 text-sm mt-1">
                                                {appointment.Doctor?.specialization}
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                {/* Appointment Information */}
                                <div className="p-6">

                                    {/* Date */}
                                    <div className="flex items-start gap-3 mb-5">

                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">
                                            📅
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                                Appointment Date
                                            </p>

                                            <p className="font-medium text-slate-700 mt-1">
                                                {new Date(
                                                    appointment.appointmentDate
                                                ).toLocaleString()}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Reason */}
                                    <div className="flex items-start gap-3 mb-5">

                                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl">
                                            📝
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                                Reason
                                            </p>

                                            <p className="font-medium text-slate-700 mt-1">
                                                {appointment.reason}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Hospital */}
                                    <div className="flex items-start gap-3 mb-5">

                                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">
                                            🏥
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                                Hospital
                                            </p>

                                            <p className="font-medium text-slate-700 mt-1">
                                                {appointment.Doctor?.hospital}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Doctor Email */}
                                    <div className="flex items-start gap-3">

                                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl">
                                            ✉️
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                                Doctor Email
                                            </p>

                                            <p className="font-medium text-slate-700 mt-1 break-all">
                                                {appointment.Doctor?.User?.email}
                                            </p>
                                        </div>

                                    </div>

                                    {appointment.status === "Pending" && (
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => updateAppointment(appointment._id, "Cancelled")}
                                                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                                            >Cancel
                                            </button>
                                        </div>
                                    )}

                                    {appointment.status === "Confirmed" && (
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => updateAppointment(appointment._id, "Cancelled")}
                                                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                                            >Cancel
                                            </button>
                                        </div>
                                    )}


                                    {/* Status */}
                                    <div className="mt-6 pt-5 border-t border-slate-100">

                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                            {appointment.status || "Pending"}
                                        </span>

                                    </div>

                                </div>

                                <button
                                onClick={() => handlePayment(appointment._id)}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                                >Pay Now</button>

                                <button
                                onClick={() => router.push(`/getpatientpayment/${appointment._id}`)}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg 
                                hover:bg-blue-700 mt-4"
                                >Check payment record</button>

                            </div>


                        ))}


                    </div>

                )}

            </main>

        </div>
    );
};

export default page;