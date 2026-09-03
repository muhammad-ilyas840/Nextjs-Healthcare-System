"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const [patientData, setPatientData] = useState({
        age: "",
        gender: "",
        bloodGroup: "",
        address: ""
    });

    const fetchPatient = async () => {
        try {
            const response = await fetch("/api/auth/patientprofile");

            const data = await response.json();

            if (response.ok) {
                setPatientData({
                    age: data.age || "",
                    gender: data.gender || "",
                    bloodGroup: data.bloodGroup || "",
                    address: data.address || ""
                });
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, []);

    const handleChange = (e) => {
        setPatientData({
            ...patientData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/updatepatientprofile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patientData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                router.push("/PatientProfile");
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">

            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Update Patient Profile
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Update your personal and healthcare information.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Age
                            </label>

                            <input
                                type="number"
                                name="age"
                                value={patientData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={patientData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>
                            </select>
                        </div>

                        {/* Blood Group */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Blood Group
                            </label>

                            <select
                                name="bloodGroup"
                                value={patientData.bloodGroup}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    Select Blood Group
                                </option>

                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={patientData.address}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter your address"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">

                            <button
                                type="button"
                                onClick={() => router.push("/PatientProfile")}
                                className="w-1/2 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="w-1/2 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                            >
                                Update Profile
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default page;