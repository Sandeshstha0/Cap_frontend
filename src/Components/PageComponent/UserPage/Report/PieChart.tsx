import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart"; // Ensure this is the correct import
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import Link from "next/link";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string | null;
  type: string;
}

interface Category {
  id: string;
  name: string;
  transactions: { id: number; amount: number; date: string }[];
  totalAmount: number;
}

interface ProtectedData {
  data: Category[];
}

const generateColor = (index: number): string => {
  const colors = [
    "#f94144",
    "#f3722c",
    "#f8961e",
    "#f9c74f",
    "#43aa8b",
    "#577590",
  ];
  return colors[index % colors.length];
};

const PieChartData: React.FC = () => {
  const [isIncome, setIsIncome] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalFilteredAmount, setTotalFilteredAmount] = useState(0);

  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<ProtectedData>(
    isIncome ? "/categories/type/INCOME" : "/categories/type/EXPENSE"
  );

  useEffect(() => {
    if (protectedData) {
      setCategories(protectedData.data);
    }
  }, [protectedData]);

  useEffect(() => {
    filterCategoriesByDate();
  }, [categories, startDate, endDate]);

  const filterCategoriesByDate = () => {
    const filtered = categories
      .map((category) => {
        const filteredTransactions = category.transactions.filter(
          (transaction) => {
            const transactionDate = new Date(transaction.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            return (
              (!start || transactionDate >= start) &&
              (!end || transactionDate <= end)
            );
          }
        );

        const totalAmount = filteredTransactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        );

        return {
          ...category,
          transactions: filteredTransactions,
          totalAmount,
        };
      })
      .filter((category) => category.totalAmount > 0);

    setFilteredCategories(filtered);
    const totalAmount = filtered.reduce(
      (sum, category) => sum + category.totalAmount,
      0
    );
    setTotalFilteredAmount(totalAmount);
  };

  if (!protectedData) {
    return <p>Loading...</p>;
  }

  const pieChartData = filteredCategories.map((category, index) => ({
    id: category.id,
    label: category.name,
    value: category.totalAmount,
    color: generateColor(index),
  }));

  return (
    <div className="container bg-white mt-6 rounded-lg p-4 sm:p-10">
      <h1 className="font-semibold text-lg mb-4">PieChartData</h1>
      <div className="flex space-x-4 items-center">
        <h2 className="font-semibold text-xl mb-4">
          {isIncome ? "Income" : "Expenses"}
        </h2>
        <button
          onClick={() => setIsIncome(!isIncome)}
          className="mb-4 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Switch to {isIncome ? "Expenses" : "Income"}
        </button>

        <div>
          <input
            type="date"
            value={startDate}
            placeholder="start date"
            onChange={(e) => setStartDate(e.target.value)}
            className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
          />
          <input
            type="date"
            placeholder="end date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
          >
            Clear Dates
          </button>
        </div>
      </div>
      <div>
        <p className="text-slate-600 mb-6">
          This report page provides a visual representation of your financial
          data. You can switch between viewing your income and expenses using
          the button below. Each category is represented in the pie chart, and
          you can click on a category to view more detailed information about
          it.
        </p>
      </div>

      <div className="flex flex-wrap justify-between items-start">
        {/* Pie Chart */}
        <div className="w-full md:w-2/3">
          <PieChart
            series={[
              {
                data: pieChartData.map(({ label, value, color }) => ({
                  id: label,
                  label,
                  value,
                  color,
                })),
              },
            ]}
            width={700}
            height={400}
          />
        </div>

        {/* Labels */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-4">
          <h2 className="font-semibold text-lg mb-2">Categories</h2>
          <ul className="space-y-2">
            {pieChartData.map((data) => (
              <li
                key={data.id}
                className={`flex items-center justify-between p-2 rounded-lg shadow `}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: data.color }}
                  ></span>
                  <Link href={`/user/report/${data.id}`}>
                    <span className="font-medium">{data.label}</span>
                  </Link>
                </div>
                <span className="font-semibold text-indigo-600">
                  {data.value.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PieChartData;
