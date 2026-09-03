"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [appointmentData, setAppointmentData] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/auth/doctorappointments", {
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

  const updateAppointment = async(appointmentId , status)=>{
    try {
      let response = await fetch(`/api/auth/doctorupdateappointment/${appointmentId}` , {
        method : "PATCH",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({status : status})
      })
      let data = await response.json()
      if(response.ok){
        alert(data.message)
      }
      else{
        alert(data.message)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600"> MediCare </h1>
            <p className="text-xs text-slate-500"> Doctor Portal </p>
          </div>
          <button
            onClick={() => router.push("/doctordashboard")}
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
          <h2 className="text-3xl font-bold text-slate-800"> My Appointments </h2>
          <p className="text-slate-500 mt-2">
            View your appointments and patient information.
          </p>
        </div>

        {/* No Appointments */}
        {appointmentData.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="text-5xl mb-4"> 📅 </div>
            <h3 className="text-xl font-semibold text-slate-700">
              No appointments yet
            </h3>
            <p className="text-slate-500 mt-2">
              You doesn't have an appointment yet.
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
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Doctor Header */}
                  <div className="bg-blue-600 p-6 text-white">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                        👨‍⚕️
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {appointment.Patient?.User?.fullname}
                        </h3>
                        <p className="text-blue-100 text-sm mt-1">
                          Age {appointment.Patient?.age}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Information */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl shrink-0">
                        📅
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">
                          Appointment Date
                        </p>
                        <p className="font-medium text-slate-700 mt-1">
                          {new Date(appointment.appointmentDate).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl shrink-0">
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

                    {/* Improved Patient Info Layout */}
                    <div className="border-t border-slate-100 pt-5 space-y-4">
                      {/* Gender & Blood Group Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center text-base shrink-0">
                            ⚥
                          </span>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                              Gender
                            </p>
                            <p className="text-sm font-semibold text-slate-700">
                              {appointment.Patient?.gender || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-md bg-rose-50 flex items-center justify-center text-base shrink-0">
                            🩸
                          </span>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                              Blood Group
                            </p>
                            <p className="text-sm font-semibold text-rose-600">
                              {appointment.Patient?.bloodgroup || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Email Block */}
                      <div className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-8 h-8 rounded-md bg-orange-100 flex items-center justify-center text-sm shrink-0">
                          ✉️
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                            Patient Email
                          </p>
                          <p
                            className="text-sm font-medium text-slate-700 truncate mt-0.5"
                            title={appointment.Patient?.User?.email}
                          >
                            {appointment.Patient?.User?.email}
                          </p>
                        </div>
                      </div>

                      {/* Address Block */}
                      <div className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="w-8 h-8 rounded-md bg-indigo-100 flex items-center justify-center text-sm shrink-0">
                          📍
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                            Patient Address
                          </p>
                          <p
                            className="text-sm font-medium text-slate-700 line-clamp-2 mt-0.5"
                            title={appointment.Patient?.address}
                          >
                            {appointment.Patient?.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 bg-slate-50/50">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                    {appointment.status}
                  </span>
                </div>
                {/* Status Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 bg-slate-50/50">

                {appointment.status === "Pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                    onClick={() => updateAppointment(appointment._id, "Confirmed")}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                    >Confirm
                    </button>
                    
                    <button
                    onClick={() => updateAppointment(appointment._id, "Cancelled")}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                    >Cancel
                    </button>
                    </div>
                  )}

                  {appointment.status === "Cancelled" && (
                    <button
                    disabled
                    className="w-full mt-4 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                      Appointment cancelled
                      </button>
                    )}

                  {appointment.status === "Confirmed" && (
                    <button
                    onClick={() => updateAppointment(appointment._id, "Completed")}
                    className="w-full mt-4 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                      Mark as Completed
                      </button>
                    )}

                    {appointment.status === "Completed" && (
                    ''
                    )}

                    <button
    onClick={() =>
      router.push(`/paymentrecord/${appointment._id}`)
    }
    className="w-full mt-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
  >
    Check Payment
  </button>
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
