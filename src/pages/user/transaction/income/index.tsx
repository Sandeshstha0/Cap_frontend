import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import React, { useState } from "react";

export default function Index() {
  const [transactions] = useState([
    { category: "Teaching", transactions: 12, amount: 13000 },
  ]);

  return (
    <UserLayout>
      {/* Main Wrapper with White Background */}
      <div className="bg-gray min-h-screen ">
        {/* Total Income Section */}
        
          <div className="bg-white p-6 rounded-lg mb-5 shadow-md">
            <h2 className="text-xl text-black font-semibold mb-4">
              Total Income this month
            </h2>
            <p className="text-xl font-semibold text-black mb-6">17000</p>
          </div>
        

          <div className="w-full">
      {/* Container with white background and shadow */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Search and Filter Section */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Sort by Dropdown */}
            <div className="flex justify-between bg-white items-center px-2 mb-4">
            <div className="flex items-center space-x-3">
              <span>Sort by</span>
              <select className="border border-gray-300 rounded-md px-2 py-2">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
            </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-between space-x-3 mt-4 items-center px-2 mb-4">
              <input
                type="text"
                placeholder="Search"
                className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
              />
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              Add New Category
            </button>
          </div>
          </div>
        {/* Table Section */}
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                  >
                   Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black  tracking-wider"
                  >
                   Transaction
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                  >
                   Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                  >
                  Action
                  </th>
                 
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  
                
                  <td className="px-6 py-4 whitespace-nowrap">Teaching</td>
                  <td className="px-6 py-4 whitespace-nowrap">12</td>
                  <td className="px-6 py-4 whitespace-nowrap">12000</td>
                  
                  
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
        
      
    </UserLayout>
  );
}
