import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import IncomeModal from "@/Components/PageComponent/UserPage/Transactions/Income/IncomeModal";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const IncomeDetails = () => {
  const [editModalState, setEditModalState] = useState(false);
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/categories/${id}`)
        .then((response) => {
          setCategory(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching category details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found.</div>;
  }

  const openModalForNewTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const openModalForEditing = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (transaction: any) => {
    if (selectedTransaction) {
      axiosInstance
        .put(`/transactions/${selectedTransaction.id}`, transaction)
        .then((response) => {
          setCategory((prevCategory: any) => ({
            ...prevCategory,
            transactions: prevCategory.transactions.map((t: any) =>
              t.id === selectedTransaction.id ? { ...t, ...transaction } : t
            ),
          }));
          setIsModalOpen(false);
          toast.success("Transaction updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating transaction:", error);
          toast.error("Failed to update transaction.");
        });
    } else {
      axiosInstance
        .post(`/transactions`, transaction)
        .then((response) => {
          setCategory((prevCategory: any) => ({
            ...prevCategory,
            transactions: [...prevCategory.transactions, response.data.data],
          }));
          setIsModalOpen(false);
          toast.success("Transaction added successfully!");
        })
        .catch((error) => {
          console.error("Error adding transaction:", error);
          toast.error("Failed to add transaction.");
        });
    }
  };

  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      axiosInstance
        .delete(`/transactions/${transactionId}`)
        .then(() => {
          setCategory((prevCategory: any) => ({
            ...prevCategory,
            transactions: prevCategory.transactions.filter((t: any) => t.id !== transactionId),
          }));
          toast.success("Transaction deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting transaction:", error);
          toast.error("Failed to delete transaction.");
        });
    }
  };

  const handleDeleteCategory = async () => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await axiosInstance.delete(`/categories/${id}`);
        toast.success("Category deleted successfully!");
        router.push("/categories"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <UserLayout>
      <div>
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-lg">Total Transaction Amount: {category.totalAmount}</p>

        <div className="flex justify-between items-center pb-4 border-gray-200">
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
              onClick={openModalForNewTransaction}
            >
              + Add New
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleDeleteCategory}
            >
              Delete Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-l font-medium text-black tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {category?.transactions?.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      onClick={() => openModalForEditing(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteTransaction(item.id)}
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

      {isModalOpen && (
        <IncomeModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          onSave={handleSaveTransaction}
          transaction={selectedTransaction}
          id={id}
        />
      )}
    </UserLayout>
  );
};

export default IncomeDetails;
