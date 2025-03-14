/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import { setAxiosAuthHeader } from "@/lib/httpClient";
import { syncLocalStorageToCookie } from "@/utils/helperFuncions";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        formData
      );

      if (response.data.data?.token) {
        const { token, refreshToken, role } = response.data.data;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);

        setAxiosAuthHeader(token);
        syncLocalStorageToCookie();

        router.push(role === "ADMIN" ? "/admin/manageuser" : "/user/dashboard");
      } else {
        setApiError(
          response.data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-primary">
      {/* Background Shapes */}
      <div className="fixed -top-10 -right-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]"></div>
      <div className="fixed top-8 -right-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500"></div>
      <div className="fixed -bottom-10 -left-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]"></div>
      <div className="fixed bottom-8 -left-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500"></div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* Image Section */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-4 md:p-8">
          <img
            src="/cuate.png"
            className="rounded-lg w-full max-w-sm md:max-w-md h-auto"
            alt="Login illustration"
          />
        </div>

        {/* Login Form Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-4 md:p-8">
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <h1 className="mb-10 text-center font-semibold text-orange-500 text-2xl md:text-3xl">
              Welcome to Budget Expert
            </h1>

            {/* Email Input */}
            <div className="mb-4 w-full md:w-5/6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6 w-full md:w-5/6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="text-right">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="mr-2 leading-tight"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="showPassword" className="text-sm text-gray-700">
                  Show Password
                </label>
              </div>
            </div>

            {/* Login Button */}
            <div className="text-center border-b-2 pb-6 border-gray w-full md:w-5/6">
              <button
                className="bg-orange-500 hover:bg-black text-white font-bold py-2 px-6 w-full rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Forgotten Password Link */}
            <div className="w-full md:w-5/6 flex justify-end mt-2">
              <Link href="/auth/forgot_password" className="text-primary hover:text-secondary font-bold">
                Forgotten password
              </Link>
            </div>

            {/* Sign Up Link */}
            <p className="mt-10 text-center text-primary">
              New to Budget?{" "}
              <Link href="/signup" className="text-primary hover:text-secondary font-bold">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
