"use client"

import { useState } from "react"
import React from 'react'

const page = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        bloodgroup: "",
        address: "",
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitting Registration Data:", formData);
    try {
      let response = await fetch("/api/auth/patient-signup" , {
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      })
      let data = await response.json()
      if(response.ok){
        alert(data.message)
        setFormData({
          fullname: "",
          email: "",
          password: "",
          age: "",
          gender: "",
          bloodgroup: "",
          address: "",
        })
      }
      else{
        alert(data.message)
      }
    } catch (err) {
      alert(err.message)
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Card Header Banner */}
        <div className="bg-linear-to-r range-start from-teal-500 to-emerald-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold tracking-wide">Patient Registration</h2>
          <p className="text-teal-100 text-sm mt-1">Create your medical profile to get started</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Section 1: Account Credentials */}
          <div>
            <h3 className="text-xs font-semibold text-teal-600 tracking-wider uppercase mb-4 border-b border-teal-100 pb-1">
              Account Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  required
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Medical & Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-teal-600 tracking-wider uppercase mb-4 border-b border-teal-100 pb-1">
              Medical & Profile Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  min="0"
                  placeholder="25"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                >
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Blood Group</label>
                <select
                  name="bloodgroup"
                  required
                  value={formData.bloodgroup}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                >
                  <option value="" disabled>Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              
              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Residential Address</label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  placeholder="123 Health Ave, Medical District"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 transform active:scale-[0.99] transition-all text-sm"
          >
            Complete Registration
          </button>
        </form>

        {/* Card Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-500">
            Already have an account? <a href="#login" className="text-teal-600 hover:underline font-medium">Log in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
