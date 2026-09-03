'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const {success , err , token , fullname , message , role} = data
      if (success) {
        localStorage.setItem("token",token);
        localStorage.setItem("loggedInUser", fullname);
        localStorage.setItem("role", role);

        if (role === "Patient") {
          router.push("/patientdashboard");
        } 
        else if (role === "Doctor") {
          router.push("/doctordashboard");
        }
      } else {
        alert(data.message);
      }
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Card Header Banner */}
        <div className="bg-blue-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold tracking-wide">Welcome Back</h2>
          <p className="text-white/80 text-sm mt-1">Please sign in to your account</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-slate-600">
                Password
              </label>
              <a href="#forgot" className="text-xs font-medium text-blue-600 hover:underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg focus:outline-none transform active:scale-[0.99] transition-all text-sm"
          >
            Sign In
          </button>
        </form>

        {/* Card Footer Redirect links */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
