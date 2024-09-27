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
    <div className="min-h-screen flex items-center justify-center bg-white text-primary">
      {/* Image div */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-4 md:p-8">
        <img
          src="/cuate.png"
          className="rounded-lg w-full max-w-sm md:max-w-md h-auto"
          alt="login"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col bg-gray mt-5 shadow-3 last:justify-center p-4 md:p-8">
        <form className="flex flex-col items-center w-full">
          <div className="mb-10 text-center font-semibold text-orange-500 text-2xl md:text-3xl">
            <h1>Welcome to Budget Expert</h1>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Full name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              type="name"
              placeholder="username"
            />
          </div>
          <div className="mb-4">
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

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="text-center border-b-2 pb-6 border-gray">
            <button
              className="bg-orange-500 hover:bg-black  text-white font-bold py-2 px-30 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign up
            </button>
          </div>
          <p className="mt-10 text-center text-primary  ">
            <Link
              href="/login"
              className="text-primary text-left hover:text-secondary font-bold"
            >
              Already have a Account?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
