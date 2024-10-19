import { useRouter } from "next/router";
import React, { useState } from "react";

import { ExpenseData } from "@/Data/Expense";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import NewExpenseModal from "@/Components/PageComponent/UserPage/Transactions/AddExpenseModal";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [editmodalState, seteditModalState] = useState(false);

  //Open edit modal
  const openEditModal = () => {
    seteditModalState(true);
  };

  const expense = ExpenseData.find((p) => p.id === parseInt(id as string));
  return (
    <UserLayout>
      <div className="bg-white rounded-lg">
        {/* Page Heading */}
        <div className="text-left text-primary font-normal px-4 py-6 md:px-10 md:py-8 lg:px-16 lg:py-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Total {expense?.category}
          </h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">
           Rs{expense?.amount}
          </p>
        </div>
      </div>

      <div className="w-full">
        {/* Container with white background and shadow */}
        <div className="bg-white p-6 mt-6  space-y-5 rounded-lg shadow-lg">
          {/* Search and Filter Section */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 w-full">
            {/* Left Section - Sort by Dropdown and Search Bar */}

            {/* Search Bar */}
            <div className="relative w-3/5">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border c focus:outline-none focus:ring-2 focus:ring-orange-500 w-full px-4 py-2 rounded-md"
              />
            </div>

            {/* Add Expense Button */}
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
              onClick={openEditModal}
            >
              + Add Expense
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black  tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                  >
                    Description
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
                {expense?.transaction.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.remark}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editmodalState && (
              <NewExpenseModal
                isOpen={editmodalState}
                closeModal={() => seteditModalState(false)}
              />
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
