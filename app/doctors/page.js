"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const fetchDoctors = async (page = 1) => {
    try {
      const limit = 1
      const response = await fetch(`/api/auth/doctorslist?page=${page}&limit=${limit}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setDoctors(data.doctors)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
        setTotalDoctors(data.totalDoctors)
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchDoctors = async () => {
    try {
      let response = await fetch(`/api/auth/searchdoctors?search=${search}&page=1&limit=2`)
      let data = await response.json()
      if(response.ok){
        setDoctors(data)
        setTimeout(() => {
          fetchDoctors()
          alert("Search again")
        }, 20000);
      }
      else{
        alert(data.message)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              MediCare
            </h1>

            <h1 className="text-2xl font-bold text-blue-600">
              Total Doctors : {totalDoctors}
            </h1>

            <p className="text-xs text-slate-500">
              Patient Portal
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto justify-center">
                        <input
                            type="text"
                            placeholder="Search by specialization or name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-2 border-blue-800 bg-white p-2 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={searchDoctors}
                            className="bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shrink-0 shadow-sm"
                        >
                            Search
                        </button>
                    </div>

          <button
            onClick={() => router.push("/patientdashboard")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
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
            Our Doctors
          </h2>

          <p className="text-slate-500 mt-2">
            Find the right doctor and book your appointment.
          </p>
        </div>


        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-slate-500">
              Loading doctors...
            </p>
          </div>
        )}


        {/* No Doctors */}
        {!loading && doctors.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              No doctors available
            </h3>

            <p className="text-slate-500 mt-2">
              There are currently no doctors registered.
            </p>
          </div>
        )}


        {/* Doctor Cards */}
        {!loading && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {doctors.map((doctor) => (

              <div
                key={doctor._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
              >

                {/* Card Header */}
                <div className="bg-blue-600 p-6 text-white">

                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-4">
                    👨‍⚕️
                  </div>

                  <h3 className="text-xl font-bold">
                    Dr. {doctor.User?.fullname}
                  </h3>

                  <p className="text-blue-100 text-sm mt-1">
                    {doctor.specialization}
                  </p>

                </div>


                {/* Doctor Information */}
                <div className="p-6 space-y-4">

                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Experience
                    </p>

                    <p className="font-medium text-slate-700">
                      {doctor.experience} years
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Hospital
                    </p>

                    <p className="font-medium text-slate-700">
                      {doctor.hospital}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Consultation Fee
                    </p>

                    <p className="font-medium text-slate-700">
                      Rs. {doctor.consultationFee}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Gender
                    </p>

                    <p className="font-medium text-slate-700">
                      {doctor.gender}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Address
                    </p>

                    <p className="font-medium text-slate-700">
                      {doctor.address}
                    </p>
                  </div>


                  {/* Book Appointment Button */}
                  <button
                    onClick={() =>
                      router.push(`/BookAppointment/${doctor._id}`)
                    }
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>

                  <button onClick={()=>{router.push(`/DoctorPublicProfile/${doctor._id}`)}}
                  class="text-white bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                  hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                  dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg 
                  dark:shadow-cyan-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center 
                  leading-5 rounded-lg">View doctor's profile</button>

                </div>

              </div>

            ))}

          </div>
        )}

      </main>

      <div className="flex justify-center items-center gap-4 mb-10">

    <button
        onClick={() => fetchDoctors(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
    >
        Previous
    </button>

    <span className="text-slate-700 font-medium">
        Page {currentPage} of {totalPages}
    </span>

    <button
        onClick={() => fetchDoctors(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
    >
        Next
    </button>

</div>

    </div>
  );
};

export default page;