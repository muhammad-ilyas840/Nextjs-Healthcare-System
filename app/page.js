import Link from "next/link";
const HealthImg = '/pexels-pavel-danilyuk-8442105.jpg'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-800 text-white shadow-md">
        <div className="text-2xl font-bold tracking-wide">
          HealthCare
        </div>

        <nav>
          <ul className="flex space-x-6 m-0 p-0 list-none">
            <li>
              <Link
                href="/"
                className="hover:text-blue-400 transition duration-200 text-sm font-medium"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/PatientSignup"
                className="hover:text-blue-400 transition duration-200 text-sm font-medium"
              >
                Patient Signup
              </Link>
            </li>

            <li>
              <Link
                href="/DoctorSignup"
                className="hover:text-blue-400 transition duration-200 text-sm font-medium"
              >
                Doctor Signup
              </Link>
            </li>

            <li>
              <Link
                href="/Login"
                className="hover:text-blue-400 transition duration-200 text-sm font-medium"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex min-h-[calc(100vh-72px)] items-center px-12 lg:px-20">

        {/* Left Side */}
        <section className="w-full lg:w-1/2 max-w-xl">

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Your Health, Our Priority
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-800">
            Quality Healthcare
            <span className="block text-blue-600">
              At Your Fingertips
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect with trusted healthcare professionals, manage your
            appointments, and take control of your health journey through
            our simple and secure healthcare platform.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/PatientSignup"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              href="/DoctorSignup"
              className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Join as a Doctor
            </Link>
          </div>

          {/* Small Features */}
          <div className="mt-10 flex gap-8 text-sm text-gray-600">
            <div>
              <p className="text-2xl font-bold text-gray-800">24/7</p>
              <p>Healthcare Access</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">Easy</p>
              <p>Appointment Booking</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">Secure</p>
              <p>Patient Information</p>
            </div>
          </div>

        </section>

        {/* Right Side - Reserved for Image/Illustration */}
        <section className="hidden lg:flex w-1/2 h-[500px] items-center justify-center">

          <div className="w-[450px] h-[400px] rounded-3xl bg-blue-50 flex items-center justify-center">
            <img 
            src={HealthImg}
            alt="Img"
            />
          </div>

        </section>

      </main>
    </div>
  );
}

