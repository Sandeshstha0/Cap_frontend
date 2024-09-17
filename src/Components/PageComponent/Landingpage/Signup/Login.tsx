/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-primary">
      <div className='fixed -top-10 -right-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]'></div>
      <div className='fixed top-8 -right-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500'></div>
      <div className='fixed -bottom-10 -left-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]'></div>
      <div className='fixed bottom-8 -left-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500'></div>
      {/* Container for both image and form with responsive behavior */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* Image div */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-4 md:p-8">
          <img
            src="/cuate.png"
            className="rounded-lg w-full max-w-sm md:max-w-md h-auto"
            alt="login"
          />
        </div>

        {/* Form div */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-4 md:p-8">
          <form className="flex flex-col items-center w-full">
            <div className="mb-10 text-center font-semibold text-orange-500 text-2xl md:text-3xl">
              <h1>Welcome to Budget Expert</h1>
            </div>
            {/* Adjusted input width and spacing */}
            <div className="mb-4 w-full md:w-5/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="examplemail@domain.com"
              />
            </div>

            <div className="mb-6 w-full md:w-5/6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'} // Toggle type between text and password
                placeholder="************"
              />
              <div className="text-right">
                <input
                  type="checkbox"
                  className="mr-2 leading-tight"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="showPassword" className="text-sm text-gray-700">
                  Show Password
                </label>
              </div>
            </div>

            {/* Button width adjusted to match the input fields */}
            <div className="text-center border-b-2 pb-6 border-gray w-full md:w-5/6">
              <button
                className="bg-orange-500 hover:bg-black text-white font-bold py-2 px-6 w-full rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </div>

            <p className="mt-10 text-center text-primary">
              New to Budget?{' '}
              <Link href="/signup" className="text-primary hover:text-secondary font-bold">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
