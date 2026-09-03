"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);

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

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              MediCare
            </h1>

            <p className="text-xs text-slate-500">
              Patient Portal
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button onClick={()=>{router.push('/PatientProfile')}}
            className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 
            hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
            dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg 
            dark:shadow-green-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center 
            leading-5 rounded-lg">See profile</button>

            {/* My Appointments */}
            <button
            onClick={() => router.push("/PatientAppointments")}
            className="rounded-lg text-black bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
            My appointments</button>

            {/* View Doctors */}
            <button
              onClick={() => router.push("/doctors")}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
            >
              View Doctors
            </button>

            {/* Welcome */}
            <div className="hidden md:block text-right ml-3">
              <p className="text-xs text-slate-500">
                Welcome
              </p>

              <p className="font-semibold text-slate-800">
                {loggedInUser}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>


      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Patient Dashboard
          </h2>

          <p className="text-slate-500 mt-2">
            Manage your appointments and healthcare from one place.
          </p>
        </div>


        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Book Appointment Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl mb-5">
              📅
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Book Appointment
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Find a doctor and schedule your next appointment.
            </p>

          </div>


          {/* My Appointments Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl mb-5">
              🩺
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              My Appointments
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View and manage your upcoming appointments.
            </p>

          </div>


          {/* Doctors Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-5">
              👨‍⚕️
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              Find Doctors
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Browse doctors and their available specialties.
            </p>

          </div>

        </div>


        {/* Bottom Section */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

          <h3 className="text-xl font-semibold text-slate-800">
            Your Healthcare
          </h3>

          <p className="text-slate-500 mt-2">
            Keep track of your appointments and connect with healthcare
            professionals easily.
          </p>

        </div>

      </main>

    </div>
  );
};

export default page;