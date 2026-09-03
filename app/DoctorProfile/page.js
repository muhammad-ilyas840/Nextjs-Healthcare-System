"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [doctorData, setDoctorData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/auth/doctorprofile");

      const data = await response.json();

      if (response.ok) {
        setDoctorData(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              MediCare
            </h1>

            <p className="text-xs text-slate-500">
              Doctor Portal
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push("/doctordashboard")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Dashboard
          </button>

        </div>
      </nav>


      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            My Profile
          </h2>

          <p className="text-slate-500 mt-2">
            View your professional and personal information.
          </p>
        </div>


        {/* Loading */}
        {!doctorData && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">
            <p className="text-slate-500">
              Loading profile...
            </p>
          </div>
        )}


        {/* Doctor Profile */}
        {doctorData && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

            {/* Profile Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* Doctor Icon */}
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-5xl">
                  👨‍⚕️
                </div>

                {/* Doctor Name */}
                <div className="text-center sm:text-left">

                  <p className="text-blue-100 text-sm font-medium">
                    Doctor Profile
                  </p>

                  <h1 className="text-3xl font-bold mt-1">
                    Dr. {doctorData.User?.fullname}
                  </h1>

                  <p className="text-blue-100 mt-2">
                    {doctorData.specialization}
                  </p>

                </div>

              </div>

            </div>


            {/* Profile Information */}
            <div className="p-8">

              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Professional Information
              </h3>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Specialization */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Specialization
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {doctorData.specialization}
                  </p>
                </div>


                {/* Experience */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Experience
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {doctorData.experience} years
                  </p>
                </div>


                {/* Hospital */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Hospital
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {doctorData.hospital}
                  </p>
                </div>


                {/* Consultation Fee */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Consultation Fee
                  </p>

                  <p className="text-lg font-semibold text-green-600 mt-2">
                    Rs. {doctorData.consultationFee}
                  </p>
                </div>


                {/* Gender */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Gender
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {doctorData.gender}
                  </p>
                </div>


                {/* Email */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2 break-all">
                    {doctorData.User?.email}
                  </p>
                </div>

              </div>


              {/* Address */}
              <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">

                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Address
                </p>

                <p className="text-lg font-semibold text-slate-800 mt-2">
                  {doctorData.address}
                </p>

              </div>

            </div>


            {/* Footer */}
            <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-evenly">

              <button
                onClick={() => router.push("/doctordashboard")}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Back to Dashboard
              </button>

              <button onClick={()=>{router.push('/EditDoctor')}}
              class="text-white bg-linear-to-r from-teal-400 via-teal-500 to-teal-600 
              hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 
              dark:focus:ring-teal-800 font-medium rounded-base text-sm px-4 py-2.5 text-center 
              leading-5 rounded-lg">Update profile</button>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default page;