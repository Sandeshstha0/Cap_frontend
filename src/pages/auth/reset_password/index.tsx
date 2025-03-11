import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

// Define a type for the error and success messages
interface ResponseMessage {
  error?: string;
  message?: string;
}

const ResetPasswordPage = () => {
  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !password) {
      setErrorMessage('Token and password are required.');
      return;
    }

    try {
      // Sending POST request to the backend using axios
      const response = await axios.post<ResponseMessage>('http://localhost:8080/api/v1/auth/reset-password', {
        token,
        password,
      });

      toast.success('Password has been successfully reset.');
      // Handling response
      setSuccessMessage('Password has been successfully reset.');
      setTimeout(() => {
        router.push('/login'); // Redirect to login page after successful reset
      }, 4000);
    } catch (error: any) {
      // Handling errors
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Failed to reset password. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center">Reset Your Password</h2>

        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">Reset Token</label>
            <input
              type="text"
              id="token"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              placeholder="Enter reset token"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center mt-4">
          {/* Using Next.js Link for navigation */}
          <Link href="/login">
            <h1 className="text-orange-500">Go back to Login</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
