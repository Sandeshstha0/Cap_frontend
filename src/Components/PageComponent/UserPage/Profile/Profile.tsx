/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import EditModal from "./EditModal";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineMoneyOff } from "react-icons/md";
import UserProfileDetail from "@/Components/globalComponent/User/UserProfileDetail";
import axiosInstance from "@/utils/axiosInstance";

interface UserData {
  data: {
    id:number;
    firstname: string;
    secondname: string;
    email: string;
  };
}

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    email: "",
  });

  const { data: protectedData, error: apiError, refetchData } =
    useFetchProtectedData<UserData>("/user");

  // Set initial form data when user data is fetched
  React.useEffect(() => {
    if (protectedData) {
      setFormData({
        firstname: protectedData.data.firstname || "",
        secondname: protectedData.data.secondname || "",
        email: protectedData.data.email || "",
      });
    }
  }, [protectedData]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated user data
 

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(`/user/${protectedData?.data?.id}`, formData);
  
      if (response.status !== 200) throw new Error("Failed to update profile");
  
      await refetchData(); // Refresh user data after update
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 p-0 bg-gray-50">
        {/* Profile Section */}
        <div className="bg-white rounded-lg text-black text-l font-normal p-8 mb-15 space-x-2">
          <h1 className="text-3xl font-semibold text-primary mb-6">
            User Profile
          </h1>

          {/* Personal Information */}
          <div className="flex-col space-y-6 text-black gap-10">
            <UserProfileDetail />

            {/* User Info */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-l font-normal">
                {/* First Name */}
                <div>
                  <label className="text-bodydark2 text-medium font-normal">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-2 py-2 text-bodydark2 text-sm border border-gray-300 rounded-lg mt-2"
                    disabled={!editMode}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="secondname"
                    value={formData.secondname}
                    onChange={handleChange}
                    className="w-full px-2 py-2 text-sm text-bodydark2 border border-gray-300 rounded-lg mt-2"
                    disabled={!editMode}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-2 text-bodydark2 text-sm border border-gray-300 rounded-lg mt-2"
                    disabled={!editMode}
                  />
                </div>
              </div>

              {/* Edit & Save Buttons */}
              <div className="mt-6">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
