/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import EditModal from "./EditModal";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineMoneyOff } from "react-icons/md";
interface UserData {
  data: {
    firstname: string;
    secondname: string;
    email: string;
  };
}
interface BudgetData {
  data: {
    totalIncome: number;
    totalExpense: number;
    totalBudget: number;
    // Add any other fields you expect from the API response here
  };
}

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editmodalState, seteditModalState] = useState(false);
  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<UserData>("/user");
  const { data: protectedata, error: apierror } =
    useFetchProtectedData<BudgetData>("/budgets");

  // Open edit modal
  const openEditModal = () => {
    seteditModalState(true);
  };
  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 p-0 bg-gray-50">
        {/* Profile Section */}
        <div className="bg-white rounded-lg text-black text-l font-normal p-8 mb-15 space-x-2">
          <h1 className="text-3xl font-semibold  text-primary mb-6">
            User Profile
          </h1>

          {/* Personal Information */}
          <div className=" flex-col space-y-6 text-black  gap-10">
            {/* Profile Picture */}
            <div className="mt-8 space-y-6 text-lg font-medium text-gray-800">
              <div className="flex items-center justify-between border-b pb-4">
                <h1 className="flex items-center space-x-2">
                  <RiMoneyDollarCircleFill className="text-blue-600 text-2xl" />
                  <span>Current Budget:</span>
                </h1>
                <span className="font-semibold text-2xl text-blue-600">
                  {protectedata?.data?.totalBudget ?? "Loading..."}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <h1 className="flex items-center space-x-2">
                  <GiTakeMyMoney className="text-green-600 text-2xl" />
                  <span>Total Income:</span>
                </h1>
                <span className="font-semibold text-2xl text-green-600">
                  {protectedata?.data?.totalIncome ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="flex items-center space-x-2">
                  <MdOutlineMoneyOff className="text-red-600 text-2xl" />
                  <span>Total Expense:</span>
                </h1>
                <span className="font-semibold text-2xl text-red">
                  {protectedata?.data?.totalExpense ?? "N/A"}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-l font-normal">
                {/* Full Name */}
                <div>
                  <label className="text-bodydark2 text-medium font-normal">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={protectedData?.data?.firstname}
                    className="w-full px-2 py-2 text-bodydark2 text-sm border border-gray-300 rounded-lg mt-2"
                    disabled
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={protectedData?.data?.secondname}
                    className="w-full px-2 py-2 text-sm text-bodydark2 border border-gray-300 rounded-lg mt-2"
                    disabled
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={protectedData?.data?.email}
                    className="w-full px-2 py-2 text-bodydark2 text-sm border border-gray-300 rounded-lg mt-2"
                    disabled
                  />
                </div>

                {/* Phone Number */}

                {/* Address */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={`${protectedData?.data?.firstname} ${protectedData?.data?.secondname}`}
                    className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                {/* <button
                  className="bg-secondary text-black text-2xl font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                  onClick={openEditModal}
                >
                  Edit Profile
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editmodalState && (
          <EditModal
            isOpen={editmodalState}
            closeModal={() => seteditModalState(false)}
          />
        )}
      </div>
    </div>
  );
}
