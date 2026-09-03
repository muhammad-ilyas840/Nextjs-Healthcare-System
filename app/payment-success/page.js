"use client";

import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 text-center max-w-md w-full">

                <div className="text-6xl mb-5">
                    ✅
                </div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Payment Successful
                </h1>

                <p className="text-slate-500 mt-3">
                    Your appointment payment has been received successfully.
                </p>

                <button
                    onClick={() => router.push("/patientappointments")}
                    className="mt-7 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    View My Appointments
                </button>

            </div>

        </div>
    );
};

export default page;