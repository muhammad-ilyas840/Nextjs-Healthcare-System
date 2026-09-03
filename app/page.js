import Image from "next/image";
import fs from 'fs/promises'
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <header className="flex justify-between items-center px-8 py-4 bg-gray-800 text-white shadow-md">
            <div className="text-2xl font-bold tracking-wide">Facebook</div>
            <nav>
              <ul className="flex space-x-6 m-0 p-0 list-none">
                <li><Link href="/" className="hover:text-blue-400 transition duration-200 text-sm font-medium">Home</Link></li>
                <li><Link href="/PatientSignup" className="hover:text-blue-400 transition duration-200 text-sm font-medium">PatientSignup</Link></li>
                <li><Link href="/DoctorSignup" className="hover:text-blue-400 transition duration-200 text-sm font-medium">Doctor Signup</Link></li>
                <li><Link href="/Login" className="hover:text-blue-400 transition duration-200 text-sm font-medium">Login</Link></li>
              </ul>
            </nav>
          </header>
    </div>
  );
}
