import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import EditCategoryModal from "@/Components/PageComponent/UserPage/Transactions/ExpenseCategoryModal";
import EditIncomeCategoryModal from "@/Components/PageComponent/UserPage/Transactions/IncomeCategoryModal";
import { getExpenseCategory, getIncomeCategory } from "@/service/transaction";

import Link from "next/link";
import React, { useState, useEffect } from "react";

// Define Category type
interface Category {
  id: string;
  name: string;
  transactions: { length: number };
  totalAmount: number;
}

export default function Index() {
  const [editmodalState, seteditModalState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch income categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getExpenseCategory();
        setCategories(response.data); // assuming `response.data` is an array of categories
      } catch (error) {
        console.error("Error fetching income categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Open edit modal
  const openEditModal = () => {
    seteditModalState(true);
  };

  return (
    <UserLayout>
      <div className="flex-grow bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Total income this month</h2>
          <p className="text-4xl font-bold text-gray-700 mb-6">17000</p>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 mt-6 space-y-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center pb-4 border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex justify-between bg-white items-center px-2 mb-4">
                  <div className="flex items-center mt-4 space-x-3">
                    <span>Sort by</span>
                    <select className="border border-gray-300 rounded-md px-2 py-2">
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between space-x-3 mt-4 items-center px-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
                  />
                </div>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  onClick={openEditModal}
                >
                  + Add New 
                </button>
              </div>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">Transaction</th>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories
                    .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((category, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/user/transaction/income/${category.id}`}>
                            {category.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{category.transactions.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{category.totalAmount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {editmodalState && (
          <EditCategoryModal
            isOpen={editmodalState}
            closeModal={() => seteditModalState(false)}
          />
        )}
      </div>
    </UserLayout>
  );
}

