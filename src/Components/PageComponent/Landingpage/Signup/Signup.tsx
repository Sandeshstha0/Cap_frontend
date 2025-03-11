/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Name length validation (min 2, max 50 characters)
    if (firstName.length < 4 || firstName.length > 12) {
      setErrorMessage("First name must be between 4 and 12 characters.");
      return false;
    }

    if (lastName.length < 4 || lastName.length > 12) {
      setErrorMessage("Last name must be between 4 and 12 characters.");
      return false;
    }

    // General validation for other fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const { firstName, lastName, email, password } = formData;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
        { firstName, lastName, email, password }
      );
      if (response.status === 200) {
        toast.success("Signup successful! Please check your email for verification.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          router.push("/auth/otpvalidation");
        }, 1500);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ToastContainer />
      <div className="fixed -top-10 -right-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]"></div>
      <div className="fixed top-8 -right-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500"></div>
      <div className="fixed -bottom-10 -left-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]"></div>
      <div className="fixed bottom-8 -left-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500"></div>

      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl md:flex overflow-hidden">
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-4 bg-gradient-to-b from-orange-200 to-orange-400">
          <img
            src="/cuate.png"
            className="rounded-lg w-full max-w-xs md:max-w-sm h-auto"
            alt="signup illustration"
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center p-10">
          <form className="flex flex-col items-center space-y-6 w-full">
            <div className="text-center font-extrabold text-orange-600 text-3xl mb-4">
              Welcome to Budget Expert
            </div>

            {/* Full Name Fields */}
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="w-full mb-4 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
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
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Fields */}
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red text-sm mt-1">{errorMessage}</p>
            )}

            {/* Show Password Toggle */}
            <div className="w-full flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor="showPassword"
                className="text-gray-600 cursor-pointer"
              >
                Show Password
              </label>
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <button
                className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                type="button"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-4 text-center text-gray-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-orange-500 font-semibold hover:text-orange-700 transition duration-300"
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
