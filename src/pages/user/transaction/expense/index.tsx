import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import EditCategoryModal from "@/Components/PageComponent/UserPage/Transactions/ExpenseCategoryModal";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import {
  createCategoryExpense,
  getExpenseCategory,
  updateCategoryExpense,
  deleteCategoryExpense,
} from "@/service/transaction";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
  id: string;
  name: string;
  transactions: { length: number };
  totalAmount: number;
}
interface BudgetData {
  data: {
    totalIncome: number;
    totalExpense: number;
    totalBudget: number;
    // Add any other fields you expect from the API response here
  };
}

export default function Index() {
  const [editModalState, setEditModalState] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<BudgetData>("/budgets");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getExpenseCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const reloadCategories = async () => {
    try {
      const response = await getExpenseCategory();
      setCategories(response.data);
    } catch (error) {
      console.error("Error reloading categories:", error);
    }
  };

  const handleSaveCategory = async (categoryName: string) => {
    if (categoryName.trim() === "") {
      toast.error("Category name cannot be empty!");
      return;
    }

    try {
      if (selectedCategory) {
        // Update existing category
        await updateCategoryExpense(selectedCategory.id, categoryName);
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await createCategoryExpense(categoryName);
        toast.success("Category added successfully!");
      }

      setEditModalState(false);
      setSelectedCategory(null);
      reloadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category.");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategoryExpense(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  const openEditModal = (category?: Category) => {
    setSelectedCategory(category || null);
    setEditModalState(true);
  };

  return (
    <UserLayout>
      <ToastContainer />
      <div className="flex-grow bg-gray-100">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold  text-orange-500">
            Total Expense :-{" "}
            <span className="text-green-600">
              {protectedData?.data?.totalExpense ?? "N/A"}
            </span>{" "}
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

                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  onClick={() => openEditModal()}
                >
                  + Add New
                </button>
              </div>
            </div>
            <h1>Please select a category or create a new category </h1>

            <div className="overflow-x-auto shadow-lg rounded-lg ">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-[#f6c624] text-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 tracking-wide flex items-center space-x-2">
                      <span>Category</span>
                      <BiCategory className="text-2xl " />
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories
                    .filter((category) =>
                      category.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/user/transaction/expense/${category.id}`}
                          >
                            <div className="flex items-center space-x-2">
                              <BiCategory className="text-2xl text-orange-400 " />{" "}
                              :-
                              <span className="hover:text-orange-600 hover:font-semibold">
                                {category.name}
                              </span>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {category.transactions.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {category.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-3 ">
                           <button
                            className="text-blue-600 text-2xl hover:text-blue-900 mr-2 hover:scale-125"
                            onClick={() => openEditModal(category)}
                          >
                             <CiEdit />
                          </button>
                          <button
                            className="text-red hover:text-red text-2xl hover:scale-125"
                            onClick={() => handleDeleteCategory(category.id)}
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
          <EditCategoryModal
            isOpen={editModalState}
            closeModal={() => setEditModalState(false)}
            onSave={handleSaveCategory}
            category={selectedCategory}
          />
        )}
      </div>
    </UserLayout>
  );
}
