import Image from "next/image";
import logo from "@/public/images/hire-purchase-logo.png";

export default function ForgotPassword() {
  return (
    <>
      {/* Top navbar */}
      <div className="flex items-center justify-start p-4 bg-white shadow-sm sticky top-0 z-50">
        <Image src={logo} alt="Hire purchase logo" height={30} />
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
          {/* Heading */}
          <h2 className="font-dm-sans font-black text-black text-3xl md:text-4xl text-center mb-3">
            Forgot Password
          </h2>
          <p className="font-dm-sans font-medium text-gray-600 text-center mb-6 text-sm md:text-base">
            Enter your registered email address and we’ll send you a 6-digit
            verification code.
          </p>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block font-dm-sans font-light text-black text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2.5 rounded-lg hover:bg-gray-700 transition-all duration-200 ease-in-out shadow-sm"
            >
              Send 6-digit Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
