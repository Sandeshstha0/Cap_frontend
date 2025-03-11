/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import UserProfileDetail from "@/Components/globalComponent/User/UserProfileDetail";
import axiosInstance from "@/utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface UserData {
  data: {
    id: number;
    firstname: string;
    secondname: string;
    email: string;
  };
}

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { data: protectedData, refetchData } = useFetchProtectedData<UserData>("/user");

  useEffect(() => {
    if (protectedData) {
      setFormData({
        firstname: protectedData.data.firstname || "",
        secondname: protectedData.data.secondname || "",
        email: protectedData.data.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [protectedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    try {
      const updatedData: any = {
        firstname: formData.firstname,
        secondname: formData.secondname,
        email: formData.email,
      };

      if (formData.password) {
        updatedData.password = formData.password;
      }

      const response = await axiosInstance.put(`/user/${protectedData?.data?.id}`, updatedData);

      if (response.status !== 200) throw new Error("Failed to update profile");

      await refetchData();
      setEditMode(false);
      setError("");
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!", { position: "top-right" });
    }
  };

  return (
    <div className="flex-1 p-0 bg-gray-50">
      <ToastContainer/>
      <div className="bg-white rounded-lg text-black p-8 mb-15 space-x-2">
        <h1 className="text-3xl font-semibold text-primary mb-6">User Profile</h1>

        <div className="flex-col space-y-6 gap-10">
          <UserProfileDetail />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-l font-normal">
            <div>
              <label className="text-bodydark2 font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg mt-2"
                disabled={!editMode}
              />
            </div>

            <div>
              <label className="text-bodydark2 font-medium">Last Name</label>
              <input
                type="text"
                name="secondname"
                value={formData.secondname}
                onChange={handleChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg mt-2"
                disabled={!editMode}
              />
            </div>

            <div>
              <label className="text-bodydark2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg mt-2"
                disabled={!editMode}
              />
            </div>

            {editMode && (
              <>
                <div>
                  <label className="text-bodydark2 font-medium">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border border-gray-300 rounded-lg mt-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-2/3"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-bodydark2 font-medium">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border border-gray-300 rounded-lg mt-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}
              </>
            )}
          </div>

          <div className="mt-6">
            {!editMode ? (
              <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-primary text-white rounded-lg">
                Edit Profile
              </button>
            ) : (
              <div className="space-x-4">
                <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  Save Changes
                </button>
                <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-red text-white rounded-lg">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
