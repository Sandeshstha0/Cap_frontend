import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import React from "react";

export default function Profile() {
  return (
    <UserLayout>
   
       
      

      {/* Main Content */}
      <div className="flex-1 p-0 bg-gray-50">
        {/* Profile Section */}
        <div className="bg-white text-black text-l font-normal py-12 px-8 mb-15 space-x-2">
          <h1 className="text-3xl font-semibold px-9 text-primary mb-6">
            User Profile
          </h1>

          {/* Personal Information */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <img
                src="/mans.png"
                alt="User Avatar"
                className="w-35 h-32 rounded-full shadow-md mb-4"
              />
              <button className="bg-primary text-l text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Edit Profile Picture
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-l font-nomal">
                {/* Full Name */}
                <div>
                  <label className="text-bodydark2 ext-medium font-normal">Full Name</label>
                  <input
                    type="text"
                    value="Sandesh Shrestha"
                    className="w-full px-2 py-2 text-bodydark2  text-sm border border-gray-300 rounded-lg mt-2"
                    disabled
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">Email</label>
                  <input
                    type="email"
                    value="sandesh@123gmail.com"
                    className="w-full px-2 py-2 text-bodydark2  text-sm  border border-gray-300 rounded-lg mt-2"
                    disabled
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">Phone Number</label>
                  <input
                    type="text"
                    value="9812190256"
                    className="w-full px-2 py-2 text-sm  text-bodydark2 border border-gray-300 rounded-lg mt-2"
                    disabled
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">Address</label>
                  <input
                    type="text"
                    value="Damauli"
                    className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2"
                    disabled
                  />
                </div>

                {/* Other Info */}
                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">Birthday</label>
                  <input
                    type="date"
                    value="1990-10-10"
                    className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2"
                    disabled
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-bodydark2 font-medium">Gender</label>
                  <input
                    type="text"
                    value="Male"
                    className="w-full px-2 py-2 text-sm border border-gray-300 text-bodydark2 rounded-lg mt-2"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-secondary text-black  text-2xl font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </UserLayout>
  );
}
