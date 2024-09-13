/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-primary">
    <div className="w-full md:w-1/2 flex flex-col items-center space-y-50">
      <img
        src="/cuate.png"
        className="rounded-lg w-100 max-w-md h-auto "
        alt="login"
      />
    </div>

    <form>
      <div className='mb-10 text-center font-semibold text-orange-500 text-3xl'>
        <h1>Welcome to Budget Expert</h1>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="examplemail@domain.com"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? "text" : "password"} // Toggle type between text and password
          placeholder="************"
        />
        <div className="text-right">
          <input
            type="checkbox"
            id=""
            className="mr-2 leading-tight"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="showPassword" className="text-sm text-gray-700">
            Show Password
          </label>
        </div>
        <p className="text-red-500 text-xs italic mt-1">Forgot Password?</p>
      </div>

      <div className="text-center border-b-2 pb-6 border-gray">
        <button
          className="bg-orange-500 hover:bg-black  text-white font-bold py-2 px-30 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
      </div>


      <p className="mt-10 text-center text-primary  ">
        New to Budget?{' '}
        <Link href="/signup" className="text-primary text-left hover:text-secondary font-bold">
          Create Account
        </Link>
      </p>
    </form>





  </div>
  )
}
