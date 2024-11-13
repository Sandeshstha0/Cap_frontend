/* eslint-disable react/no-unescaped-entities */
import { useState, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpValidation: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }
    if (otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/verify-otp",
        { email, otp }
      );
      if (response.status === 200) {
        toast.success("OTP validated successfully!");
        // Redirect user or perform another action here
      }
    } catch (error) {
      toast.error("OTP validation failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="fixed -top-10 -right-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]"></div>
      <div className="fixed top-8 -right-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500"></div>
      <div className="fixed -bottom-10 -left-16 rotate-45 w-24 md:w-32 h-24 md:h-32 bg-[#007296]"></div>
      <div className="fixed bottom-8 -left-12 rotate-45 w-16 md:w-24 h-16 md:h-24 bg-orange-500"></div>
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Verify Your Account
        </h2>
        <ToastContainer />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* OTP Input */}
          <div>
            <label className="block text-gray-600 font-medium" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={() => {
              // Logic to resend OTP
              toast.info("Resending OTP...");
            }}
            className="text-orange-500 hover:text-orange-600 font-medium transition duration-300"
          >
            Resend
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpValidation;
