"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const page = () => {
    const params = useParams();
    const router = useRouter();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const doctorId = params.doctorId;

    const fetchDoctor = async () => {
        try {
            const response = await fetch(
                `/api/auth/doctorpublicprofile/${doctorId}`
            );

            const data = await response.json();

            if (response.ok) {
                setDoctor(data);
            } else {
                alert(data.message);
            }

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctorId) {
            fetchDoctor();
        }
    }, [doctorId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-500 text-lg">
                    Loading doctor profile...
                </p>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <h2 className="text-2xl font-bold text-slate-700">
                        Doctor not found
                    </h2>

                    <button
                        onClick={() => router.push("/doctors")}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">
                            MediCare
                        </h1>

                        <p className="text-xs text-slate-500">
                            Patient Portal
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/doctors")}
                        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Back to Doctors
                    </button>

                </div>
            </nav>

            {/* Profile */}
            <main className="max-w-4xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="bg-green-600 rounded-2xl p-8 text-white shadow-lg">

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                        <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-6xl">
                            👨‍⚕️
                        </div>

                        <div className="text-center md:text-left">

                            <p className="text-blue-100 text-sm">
                                Doctor Profile
                            </p>

                            <h2 className="text-3xl font-bold mt-1">
                                Dr. {doctor.User?.fullname}
                            </h2>

                            <p className="text-blue-100 mt-2">
                                {doctor.specialization}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Doctor Information */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-6 p-8">

                    <h3 className="text-2xl font-bold text-slate-800 mb-6">
                        Doctor Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Full Name
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1">
                                Dr. {doctor.User?.fullname}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Email
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1 break-all">
                                {doctor.User?.email}
                            </p>
                        </div>

                        {/* Specialization */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Specialization
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1">
                                {doctor.specialization || "N/A"}
                            </p>
                        </div>

                        {/* Gender */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Gender
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1">
                                {doctor.gender || "N/A"}
                            </p>
                        </div>

                        {/* Experience */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Experience
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1">
                                {doctor.experience
                                    ? `${doctor.experience} years`
                                    : "N/A"}
                            </p>
                        </div>

                        {/* Hospital */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Hospital
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1">
                                {doctor.hospital || "N/A"}
                            </p>
                        </div>

                        {/* Consultation Fee */}
                        <div className="bg-emerald-50 rounded-xl p-5">
                            <p className="text-xs text-emerald-600 uppercase font-semibold">
                                Consultation Fee
                            </p>

                            <p className="text-2xl font-bold text-emerald-600 mt-1">
                                ${doctor.consultationFee || 0}
                            </p>
                        </div>

                        {/* Address */}
                        <div className="bg-slate-50 rounded-xl p-5">
                            <p className="text-xs text-slate-400 uppercase font-semibold">
                                Address
                            </p>

                            <p className="text-lg font-semibold text-slate-700 mt-1">
                                {doctor.address || "N/A"}
                            </p>
                        </div>

                    </div>

                    {/* Book Appointment */}
                    <div className="border-t border-slate-100 mt-8 pt-6">

                        <button
                            onClick={() =>
                                router.push(`/BookAppointment/${doctor._id}`)
                            }
                            className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Book Appointment
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default page;

