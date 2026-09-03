"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const params = useParams();

  const [paymentData, setPaymentData] = useState([]);

  const appointmentId = params.appointmentId;

  const fetchPayment = async () => {
    try {
      const response = await fetch(
        `/api/auth/patientpayment/${appointmentId}`
      );

      const data = await response.json();

      if (response.ok) {
        setPaymentData(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (appointmentId) {
      fetchPayment();
    }
  }, [appointmentId]);

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
            onClick={() => router.push("/patientappointments")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            My Appointments
          </button>

        </div>
      </nav>


      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Payment Record
          </h2>

          <p className="text-slate-500 mt-2">
            View your payment details and doctor information.
          </p>
        </div>


        {/* No Payment */}
        {paymentData.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">

            <div className="text-5xl mb-4">
              💳
            </div>

            <h3 className="text-xl font-semibold text-slate-700">
              No payment record found
            </h3>

            <p className="text-slate-500 mt-2">
              There is no payment record associated with this appointment.
            </p>

            <button
              onClick={() => router.push("/patientappointments")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Back to Appointments
            </button>

          </div>
        )}


        {/* Payment Records */}
        {paymentData.length > 0 && (
          <div className="space-y-6">

            {paymentData.map((payment) => (

              <div
                key={payment._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
              >

                {/* Payment Header */}
                <div className="bg-linear-to-r from-emerald-500 to-teal-600 p-6 text-white">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-emerald-100 text-sm">
                        Payment Status
                      </p>

                      <h3 className="text-2xl font-bold mt-1">
                        {payment.paymentStatus}
                      </h3>
                    </div>

                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                      💳
                    </div>

                  </div>

                </div>


                <div className="p-6">

                  {/* Doctor Information */}
                  <div className="border-b border-slate-100 pb-6 mb-6">

                    <h3 className="text-xl font-bold text-slate-800 mb-4">
                      Doctor Information
                    </h3>

                    <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-5">

                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                        👨‍⚕️
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-slate-800">
                          Dr. {payment.Doctor?.User?.fullname || "N/A"}
                        </h4>

                        <p className="text-sm text-blue-600 font-medium mt-1">
                          {payment.Doctor?.specialization || "N/A"}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          {payment.Doctor?.User?.email || "N/A"}
                        </p>
                      </div>

                    </div>


                    {/* Doctor Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase font-semibold">
                          Hospital
                        </p>

                        <p className="font-medium text-slate-700 mt-1">
                          {payment.Doctor?.hospital || "N/A"}
                        </p>
                      </div>


                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase font-semibold">
                          Experience
                        </p>

                        <p className="font-medium text-slate-700 mt-1">
                          {payment.Doctor?.experience || "N/A"} years
                        </p>
                      </div>


                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase font-semibold">
                          Gender
                        </p>

                        <p className="font-medium text-slate-700 mt-1">
                          {payment.Doctor?.gender || "N/A"}
                        </p>
                      </div>


                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-xs text-slate-400 uppercase font-semibold">
                          Address
                        </p>

                        <p className="font-medium text-slate-700 mt-1">
                          {payment.Doctor?.address || "N/A"}
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* Payment Information */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Payment Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Amount */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        Amount Paid
                      </p>

                      <p className="text-2xl font-bold text-emerald-600 mt-1">
                        Rs. {payment.amount}
                      </p>
                    </div>


                    {/* Payment Method */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        Payment Method
                      </p>

                      <p className="text-lg font-semibold text-slate-700 mt-1">
                        {payment.paymentMethod}
                      </p>
                    </div>


                    {/* Transaction ID */}
                    <div className="bg-slate-50 rounded-xl p-4 md:col-span-2">

                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        Transaction ID
                      </p>

                      <p className="text-sm font-medium text-slate-700 mt-2 break-all">
                        {payment.transactionId}
                      </p>

                    </div>


                    {/* Payment Date */}
                    <div className="bg-slate-50 rounded-xl p-4">

                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        Payment Date
                      </p>

                      <p className="text-sm font-medium text-slate-700 mt-1">
                        {new Date(payment.createdAt).toLocaleString()}
                      </p>

                    </div>


                    {/* Updated Date */}
                    <div className="bg-slate-50 rounded-xl p-4">

                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        Last Updated
                      </p>

                      <p className="text-sm font-medium text-slate-700 mt-1">
                        {new Date(payment.updatedAt).toLocaleString()}
                      </p>

                    </div>

                  </div>


                  {/* Status */}
                  <div className="mt-6 border-t border-slate-100 pt-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-xs text-slate-400 uppercase font-semibold">
                          Payment Status
                        </p>

                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {payment.paymentStatus}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          payment.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : payment.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>

                    </div>

                  </div>

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