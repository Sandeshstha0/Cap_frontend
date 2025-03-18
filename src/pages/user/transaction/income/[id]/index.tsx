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
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
    let filteredTransactions = category.transactions;

    if (timeFilter === "day") {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "day")
      );
    }
    if (timeFilter === "week") {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "week")
      );
    }
    if (timeFilter === "month") {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "month")
      );
    }
    if (timeFilter === "year") {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        dayjs(txn.date).isSame(now, "year")
      );
    }

    if (startDate) {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        dayjs(txn.date).isAfter(dayjs(startDate).subtract(1, "day"))
      );
    }

    if (endDate) {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        dayjs(txn.date).isBefore(dayjs(endDate).add(1, "day"))
      );
    }

    if (searchTerm) {
      filteredTransactions = filteredTransactions.filter((txn: any) =>
        txn.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredTransactions;
  };

  const filteredTransactions = filterTransactions();

  const totalFilteredAmount = filteredTransactions.reduce(
    (total: number, txn: any) => total + txn.amount,
    0
  );

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

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <UserLayout>
      <div>
        <div className="bg-white p-6 rounded-xl shadow-xl mb-6 text-black">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {category.name}
              </h1>
              <p className="text-lg mt-1">
                Total Amount:
                <span className="text-orange-500 font-semibold text-2xl ml-2">
                  {totalFilteredAmount}
                </span>
              </p>
            </div>
            <button
              onClick={handleBack}
              className="text-4xl text-orange-500 transition-transform duration-300 transform hover:scale-110"
            >
              <IoArrowBackCircleOutline />
            </button>
          </div>

          {/* Search and Add New */}
          <div className="flex justify-between mt-4 items-center  border-gray-200">
            <div className="flex items-center space-x-4 w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 focus:outline-none w-5/6 focus:ring-2 focus:ring-orange-500 px-4 py-2 rounded-md"
              />
              <button
                className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all w-1/6"
                onClick={openModalForNewTransaction}
              >
                + Add New
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex mt-6 flex-wrap  space-x-4 items-center gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all"
              onClick={clearDates}
            >
              Clear Dates
            </button>
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
