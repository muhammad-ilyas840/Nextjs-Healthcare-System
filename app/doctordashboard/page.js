
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const [loggedInUser, setLoggedInUser] = useState("");
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await fetch("/api/auth/doctorappointmentstats", {
                method: "GET",
            });

            const data = await response.json();

            if (response.ok) {
                setStatistics(data);
            } else {
                alert(data.message);
            }

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST"
        });

        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("role");

        router.push("/Login");
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 shadow-sm">

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Doctor Name */}
                    <div>
                        <p className="text-xs text-slate-500">
                            Welcome
                        </p>

                        <h1 className="text-xl font-bold text-slate-800">
                            Dr. {loggedInUser}
                        </h1>
                    </div>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => router.push("/DoctorProfile")}
                            className="px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                        >
                            See Profile
                        </button>

                        <button
                            onClick={() => router.push("/DoctorAppointments")}
                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                        >
                            See Appointments
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>


            {/* Dashboard */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold text-slate-800">
                    Doctor Dashboard
                </h2>

                <p className="text-slate-500 mt-2">
                    Manage your appointments and patients from one place.
                </p>


                {/* Loading */}
                {loading && (
                    <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-10 text-center">
                        <p className="text-slate-500">
                            Loading appointment statistics...
                        </p>
                    </div>
                )}


                {/* Statistics */}
                {!loading && statistics && (

                    <div className="mt-10">

                        <h3 className="text-2xl font-bold text-slate-800 mb-6">
                            Appointment Overview
                        </h3>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* Total Appointments */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Total Appointments
                                        </p>

                                        <h3 className="text-3xl font-bold text-slate-800 mt-2">
                                            {statistics.totalAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                        📅
                                    </div>

                                </div>
                            </div>


                            {/* Today's Appointments */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Today's Appointments
                                        </p>

                                        <h3 className="text-3xl font-bold text-blue-600 mt-2">
                                            {statistics.todayAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                        📆
                                    </div>

                                </div>
                            </div>


                            {/* Yesterday */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Yesterday
                                        </p>

                                        <h3 className="text-3xl font-bold text-purple-600 mt-2">
                                            {statistics.yesterdayAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                                        ⏮️
                                    </div>

                                </div>
                            </div>


                            {/* Previous Appointments */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Previous Appointments
                                        </p>

                                        <h3 className="text-3xl font-bold text-slate-600 mt-2">
                                            {statistics.previousAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                                        🕒
                                    </div>

                                </div>
                            </div>


                            {/* Pending */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Pending
                                        </p>

                                        <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                                            {statistics.pendingAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                                        ⏳
                                    </div>

                                </div>
                            </div>


                            {/* Confirmed */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Confirmed
                                        </p>

                                        <h3 className="text-3xl font-bold text-blue-600 mt-2">
                                            {statistics.confirmedAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                        ✅
                                    </div>

                                </div>
                            </div>


                            {/* Completed */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Completed
                                        </p>

                                        <h3 className="text-3xl font-bold text-green-600 mt-2">
                                            {statistics.completedAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                                        ✔️
                                    </div>

                                </div>
                            </div>


                            {/* Cancelled */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Cancelled
                                        </p>

                                        <h3 className="text-3xl font-bold text-red-600 mt-2">
                                            {statistics.cancelledAppointments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                                        ❌
                                    </div>

                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Pending Payments
                                        </p>

                                        <h3 className="text-3xl font-bold text-blue-600 mt-2">
                                            {statistics.pendingPayments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                        ⏳
                                    </div>

                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Paid Payments
                                        </p>

                                        <h3 className="text-3xl font-bold text-blue-600 mt-2">
                                            {statistics.paidPayments}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                                        ✅
                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>
                )}

            </main>

        </div>
    );
};

export default page;
