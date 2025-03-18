import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import EditIncomeCategoryModal from "@/Components/PageComponent/UserPage/Transactions/IncomeCategoryModal";
import {
  createCategory,
  deleteCategoryExpense,
  getIncomeCategory,
  updateCategoryIncome,
} from "@/service/transaction";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";

interface Category {
  id: string;
  name: string;
  transactions: { id: number; amount: number; date: string }[];
  totalAmount: number;
}

interface BudgetData {
  data: {
    totalIncome: number;
    totalExpense: number;
    totalBudget: number;
  };
}

export default function Index() {
  const [editModalState, setEditModalState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalFilteredAmount, setTotalFilteredAmount] = useState(0);

  const { data: protectedData } = useFetchProtectedData<BudgetData>("/budgets");

  useEffect(() => {
    reloadCategories();
  }, []);

  useEffect(() => {
    filterCategoriesByDate();
  }, [categories, startDate, endDate]);

  useEffect(() => {
    filterCategoriesBySearchTerm();
  }, [searchTerm]);

  const filterCategoriesByDate = () => {
    const filtered = categories.filter((category) => {
      const categoryDate = new Date(category.transactions[0]?.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        (!startDate || categoryDate >= start) &&
        (!endDate || categoryDate <= end)
      );
    });
    setFilteredCategories(filtered);
    const totalAmount = filtered.reduce(
      (sum, category) => sum + category.totalAmount,
      0
    );
    setTotalFilteredAmount(totalAmount);
  };

  const filterCategoriesBySearchTerm = () => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const reloadCategories = async () => {
    try {
      const response = await getIncomeCategory();
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error("Error reloading categories:", error);
    }
  };

  const handleSaveCategory = async (categoryName: string) => {
    try {
      if (selectedCategory) {
        // Update existing category
        await updateCategoryIncome(selectedCategory.id, categoryName);
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await createCategory(categoryName);
        toast.success("Category added successfully!");
      }
      setEditModalState(false);
      reloadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category.");
    }
  };

  return (
    <UserLayout>
      <ToastContainer />
      <div className="flex-grow bg-gray-100">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-orange-500">
            Total Income :-{" "}
            <span className="text-green-600">{totalFilteredAmount}</span>
          </h2>
        </div>

        <div className="w-full">
          <div className="bg-white p-6 mt-6 space-y-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center px-2 border-gray-200">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
                />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded"
                />
                <button
                  className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                >
                  Clear Dates
                </button>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  onClick={() => {
                    setSelectedCategory(null);
                    setEditModalState(true);
                  }}
                >
                  + Add New
                </button>
              </div>
            </div>

            <h1>Please select a category or create a new category</h1>

            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-[#f6c624] text-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 tracking-wide flex items-center space-x-2">
                      <span>Category</span>
                      <BiCategory className="text-2xl" />
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium  tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/user/transaction/income/${category.id}`}>
                          <div className="flex items-center space-x-2 cursor-pointer hover:text-orange-600 hover:font-semibold">
                            <BiCategory className="text-2xl text-orange-400" />
                            <span>{category.name}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        {category.transactions.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {category.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <button
                          className="text-blue-600 text-2xl hover:text-blue-900 mr-2 hover:scale-125"
                          onClick={() => {
                            setSelectedCategory(category);
                            setEditModalState(true);
                          }}
                        >
                          <CiEdit />
                        </button>
                        <button
                          className="text-red text-2xl hover:text-red-800 hover:scale-125"
                          onClick={async () => {
                            if (
                              confirm(
                                "Are you sure you want to delete this category?"
                              )
                            ) {
                              await deleteCategoryExpense(category.id);
                              reloadCategories();
                            }
                          }}
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {editModalState && (
          <EditIncomeCategoryModal
            isOpen={editModalState}
            closeModal={() => setEditModalState(false)}
            onSave={handleSaveCategory}
            category={selectedCategory} // Pass the selected category for editing
          />
        )}
      </div>
    </UserLayout>
  );
}
