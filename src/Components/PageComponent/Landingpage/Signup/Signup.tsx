/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";


export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      // Proceed with form submission (add your logic here)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      {/* Decorative Shapes */}
      <div className='fixed -top-10 -right-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]'></div>
      <div className='fixed top-8 -right-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500'></div>
      <div className='fixed -bottom-10 -left-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]'></div>
      <div className='fixed bottom-8 -left-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500'></div>
      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto  bg-white rounded-xl md:flex overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-8 ">
          <img
            src="/cuate.png"
            className="rounded-lg w-full max-w-xs md:max-w-sm h-auto"
            alt="signup illustration"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <form className="flex flex-col items-center space-y-6 w-full">
            {/* Welcome Text */}
            <div className="text-center font-bold text-orange-500 text-3xl">
              Welcome to Budget Expert
            </div>

            {/* Full Name */}
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-orange-500"
                name="name"
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-orange-500"
                id="email"
                type="email"
                placeholder="example@mail.com"
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-orange-500"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-orange-500"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>

            {/* Show Password Toggle */}
            <div className="w-full flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label
                htmlFor="showPassword"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Show Password
              </label>
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 w-full rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                type="button"
                onClick={handleSignIn}
              >
                Sign up
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-4 text-center text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-orange-500 font-semibold hover:text-orange-700"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
