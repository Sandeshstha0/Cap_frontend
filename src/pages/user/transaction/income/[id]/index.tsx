import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import IncomeModal from "@/Components/PageComponent/UserPage/Transactions/Income/IncomeModal";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";

const IncomeDetails = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const handleBack = () => {
    router.back();
  };

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

  const filterTransactions = () => {
    const now = dayjs();

    if (timeFilter === "day") {
      return category.transactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "day")
      );
    }
    if (timeFilter === "week") {
      return category.transactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "week")
      );
    }
    if (timeFilter === "month") {
      return category.transactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "month")
      );
    }
    if (timeFilter === "year") {
      return category.transactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "year")
      );
    }

    return category.transactions;
  };

  const filteredTransactions = filterTransactions();

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
            transactions: prevCategory.transactions.filter(
              (t: any) => t.id !== transactionId
            ),
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
        router.push("/categories");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <UserLayout>
      <div>
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 text-black">
          <div className="flex justify-between space-x-2 ">
            <div>
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="text-lg ">
                Total Amount :-{" "}
                <span className="text-orange-500 font-semibold text-2xl">
                  {category.totalAmount}
                </span>{" "}
              </p>
            </div>
            <button
              onClick={handleBack}
              className="text-4xl px-4 py-2 rounded-lg mb-4 text-orange-500 font-semibold hover:scale-125"
            >
              <IoArrowBackCircleOutline />
            </button>
          </div>

          <div className="flex justify-between mt-4 items-center  border-gray-200">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
              />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded"
              >
                <option value="all">All</option>
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                onClick={openModalForNewTransaction}
              >
                + Add New
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-lg bg-white p-4 rounded-lg ">
          <div className="overflow-x-auto shadow-lg rounded-lg ">
            <table className="min-w-full divide-y rou  divide-gray-200 rounded-lg">
              <thead className="bg-[#f6c624] text-black rounded-lg">
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
                {filteredTransactions.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center ">
                      {" "}
                      <span className="text-orange-500 font-semibold text-2xl">
                        {" "}
                        <MdOutlineAttachMoney />
                      </span>
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-3">
                      <button
                        className="text-blue-600 text-2xl hover:text-blue-900 mr-2 "
                        onClick={() => openModalForEditing(item)}
                      >
                        <CiEdit className="hover:scale-125" />
                      </button>
                      <button
                        className="text-red hover:text-red text-2xl hover:scale-125"
                        onClick={() => handleDeleteTransaction(item.id)}
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

      {isModalOpen && (
        <IncomeModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          onSave={handleSaveTransaction}
          transaction={selectedTransaction}
          id={id ? Number(id) : 0}
        />
      )}
    </UserLayout>
  );
};

export default IncomeDetails;
