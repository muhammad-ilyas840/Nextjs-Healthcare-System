'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const router = useRouter();
  const [appointmentData, setAppointmentData] = useState({
    reason : '',
    appointmentDate : ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/appointment/${doctorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            reason: appointmentData.reason,
            appointmentDate: appointmentData.appointmentDate
        }),
    });

      const data = await response.json();

      if (response.ok) {
        alert(data.message)
      }
      else{
        alert(data.message)
      }

    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e)=>{
    setAppointmentData({
      ... appointmentData , [e.target.name] : e.target.value 
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Book Appointment</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              required
              name = 'appointmentDate'
              value={appointmentData.appointmentDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Reason for Visit
            </label>
            <textarea
              required
              rows={3}
              placeholder="Briefly describe your symptoms or reason..."
              name = 'reason'
              value={appointmentData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >Book
          </button>
        </form>

      </div>
    </div>
  );
}
