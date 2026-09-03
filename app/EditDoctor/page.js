"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const [doctorData, setDoctorData] = useState({
        specialization: "",
        gender: "",
        experience: "",
        hospital: "",
        consultationFee: "",
        address: ""
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Fetch doctor profile
    const fetchDoctorProfile = async () => {
        try {
            const response = await fetch("/api/auth/doctorprofile");

            const data = await response.json();

            if (response.ok) {
                setDoctorData({
                    specialization: data.specialization || "",
                    gender: data.gender || "",
                    experience: data.experience || "",
                    hospital: data.hospital || "",
                    consultationFee: data.consultationFee || "",
                    address: data.address || ""
                });
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
        fetchDoctorProfile();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setDoctorData({
            ...doctorData,
            [e.target.name]: e.target.value
        });
    };

    // Update doctor profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            const response = await fetch("/api/auth/updatedoctorprofile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctorData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                router.push("/doctorprofile");
            } else {
                alert(data.message);
            }

        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-slate-500">
                    Loading profile...
                </p>
            </div>
        );
    }

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
                        onClick={() => router.push("/doctordashboard")}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Dashboard
                    </button>

                </div>
            </nav>

            {/* Main */}
            <main className="max-w-4xl mx-auto px-6 py-10">

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                    {/* Header */}
                    <div className="bg-blue-600 px-8 py-7 text-white">

                        <div className="flex items-center gap-5">

                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                👨‍⚕️
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">
                                    Update Doctor Profile
                                </h2>

                                <p className="text-blue-100 mt-1">
                                    Update your professional information
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-8"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Specialization */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    name="specialization"
                                    value={doctorData.specialization}
                                    onChange={handleChange}
                                    placeholder="e.g. Cardiologist"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={doctorData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Experience
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    value={doctorData.experience}
                                    onChange={handleChange}
                                    placeholder="Years of experience"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Hospital */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Hospital
                                </label>

                                <input
                                    type="text"
                                    name="hospital"
                                    value={doctorData.hospital}
                                    onChange={handleChange}
                                    placeholder="Hospital name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Consultation Fee */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Consultation Fee
                                </label>

                                <input
                                    type="number"
                                    name="consultationFee"
                                    value={doctorData.consultationFee}
                                    onChange={handleChange}
                                    placeholder="Consultation fee"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={doctorData.address}
                                    onChange={handleChange}
                                    placeholder="Clinic/Hospital address"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200">

                            <button
                                type="button"
                                onClick={() => router.push("/doctorprofile")}
                                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={updating}
                                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {updating ? "Updating..." : "Update Profile"}
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default page;