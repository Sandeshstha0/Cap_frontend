import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link'; // Import Link from next/link
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '@/Components/Animations/LoadingAnimation';

// Type for the response from the backend
interface ResponseMessage {
  message?: string;
  error?: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Email is required');
      return;
    }

    setLoading(true); // Set loading to true when form is submitted

    try {
      // Sending the email to the backend API to initiate the reset process
      const response = await axios.post<ResponseMessage>('http://localhost:8080/api/v1/auth/forgot-password', { email });

      toast.success('Password reset email sent successfully. Please check your inbox.');
      // Handling success response
      setSuccessMessage('Password reset email sent successfully. Please check your inbox.');
      setEmail(''); // Clear the email input field
      setTimeout(() => {
        router.push('/auth/reset_password'); // Redirect to reset password page after successful reset
      }, 2000);
    } catch (error: any) {
      // Handling error response
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Failed to send reset email. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center">Forgot Your Password?</h2>

  

        {errorMessage && <div className="text-red text-center">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none"
            disabled={loading} // Disable the button when loading
          >
            {loading ?  <LoadingAnimation/>: 'Send Reset Email'}
          </button>
        </form>

        <div className="text-center mt-4">
          {/* Use Link component from next/link */}
          <Link href="/login">
            <h1 className="text-orange-500">Go back to Login</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
