"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [patientData, setPatientData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/auth/patientprofile");

      const data = await response.json();

      if (response.ok) {
        setPatientData(data);
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
              Patient Portal
            </p>
          </div>

          {/* Dashboard */}
          <button
            onClick={() => router.push("/patientdashboard")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Dashboard
          </button>

        </div>
      </nav>


      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            My Profile
          </h2>

          <p className="text-slate-500 mt-2">
            View your personal and healthcare information.
          </p>
        </div>


        {/* Loading */}
        {!patientData && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">
            <p className="text-slate-500">
              Loading profile...
            </p>
          </div>
        )}


        {/* Patient Profile */}
        {patientData && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">

            {/* Profile Header */}
            <div className="bg-linear-to-r from-red-600 to-pink-600 px-8 py-10 text-white">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* Patient Icon */}
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-5xl">
                  👤
                </div>

                {/* Name */}
                <div className="text-center sm:text-left">

                  <p className="text-blue-100 text-sm font-medium">
                    Patient Profile
                  </p>

                  <h1 className="text-3xl font-bold mt-1">
                    {patientData.User?.fullname}
                  </h1>

                  <p className="text-blue-100 mt-2">
                    {patientData.User?.email}
                  </p>

                </div>

              </div>

            </div>


            {/* Information */}
            <div className="p-8">

              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Personal Information
              </h3>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Full Name
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {patientData.User?.fullname}
                  </p>

                </div>


                {/* Email */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2 break-all">
                    {patientData.User?.email}
                  </p>

                </div>


                {/* Age */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Age
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {patientData.age} years
                  </p>

                </div>


                {/* Gender */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Gender
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {patientData.gender}
                  </p>

                </div>


                {/* Blood Group */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Blood Group
                  </p>

                  <p className="text-lg font-semibold text-red-600 mt-2">
                    {patientData.bloodgroup}
                  </p>

                </div>


                {/* Address */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Address
                  </p>

                  <p className="text-lg font-semibold text-slate-800 mt-2">
                    {patientData.address}
                  </p>

                </div>

              </div>

            </div>


            {/* Footer */}
            <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-evenly">

              <button
                onClick={() => router.push("/patientdashboard")}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Back to Dashboard
              </button>

              <button onClick={()=>{router.push('/EditPatient')}}
              class="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 
              hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
              dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg 
              dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center 
              leading-5 rounded-lg">Update profile</button>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default page;