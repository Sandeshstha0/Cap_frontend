import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import EditCategoryModal from "@/Components/PageComponent/UserPage/Transactions/ExpenseCategoryModal";
import {
  createCategoryExpense,
  getExpenseCategory,
  updateCategoryExpense,
  deleteCategoryExpense,
} from "@/service/transaction";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
  id: string;
  name: string;
  transactions: { length: number };
  totalAmount: number;
}

export default function Index() {
  const [editModalState, setEditModalState] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

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
        await updateCategoryExpense(selectedCategory.id,categoryName);
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
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategoryExpense(categoryId);
      setCategories((prev) => prev.filter((category) => category.id !== categoryId));
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
                  onClick={() => openEditModal()}
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
                    .filter((category) =>
                      category.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/user/transaction/income/${category.id}`}>
                            {category.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {category.transactions.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {category.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-2"
                            onClick={() => openEditModal(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
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
