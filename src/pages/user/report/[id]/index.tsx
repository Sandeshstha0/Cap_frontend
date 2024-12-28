import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axiosInstance';
import UserLayout from '@/Components/globalComponent/User/Layouts/UserLayout';
import { PieChart } from '@mui/x-charts';
import dayjs from 'dayjs';

export default function Index() {
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<string>('all'); // Time filter state
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/categories/${id}`)
        .then((response: any) => {
          const data = response.data.data || [];
          setCategory(Array.isArray(data) ? data : [data]);
        })
        .catch((error: any) => {
          console.error('Error fetching category details:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const filterTransactions = () => {
    const now = dayjs();
    return category.flatMap((cat) =>
      cat.transactions.filter((txn: any) => {
        if (timeFilter === 'day') return dayjs(txn.date).isSame(now, 'day');
        if (timeFilter === 'week') return dayjs(txn.date).isSame(now, 'week');
        if (timeFilter === 'month') return dayjs(txn.date).isSame(now, 'month');
        if (timeFilter === 'year') return dayjs(txn.date).isSame(now, 'year');
        return true; // Show all if no filter applied
      })
    );
  };

  const generateColor = (index: number) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[index % colors.length];
  };

  const filteredTransactions = filterTransactions();

  const pieChartData = filteredTransactions.map((transaction: any, index: number) => ({
    id: transaction.id,
    label: transaction.description || `Transaction ${transaction.id}`,
    value: transaction.amount || 0,
    color: generateColor(index),
  }));

  // Data Analysis and Description
  const totalTransactions = filteredTransactions.length;
  const totalValue = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const averageValue = totalTransactions > 0 ? totalValue / totalTransactions : 0;
  const maxTransaction = Math.max(...filteredTransactions.map((txn) => txn.amount || 0), 0);
  const minTransaction = Math.min(...filteredTransactions.map((txn) => txn.amount || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <UserLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container overflow-y-hidden bg-white mt-6 rounded-lg p-4 sm:p-10 print:bg-white">
          <h1 className="font-semibold text-lg mb-4">
            Data Analysis: {category[0]?.name}
          </h1>
          <div className="mb-4 flex space-x-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Time</option>
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 print:hidden"
            >
              Print Report
            </button>
          </div>

          {/* Data Analysis */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Summary</h2>
            <p>
              This category includes <strong>{totalTransactions}</strong> transactions
              with a total value of <strong>Rs {totalValue.toFixed(2)}</strong>.
              The average transaction amount is{' '}
              <strong>Rs {averageValue.toFixed(2)}</strong>. The largest transaction was{' '}
              <strong>Rs {maxTransaction.toFixed(2)}</strong>, and the smallest was{' '}
              <strong>Rs {minTransaction.toFixed(2)}</strong>.
            </p>
          </div>

          {/* Pie Chart and Transactions */}
          <div className="flex flex-wrap justify-between items-start">
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
            <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-4">
              <h2 className="font-semibold text-lg mb-2">Transactions</h2>
              <ul className="space-y-2">
                {pieChartData.map((data, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg shadow print:shadow-none print:border print:border-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: data.color }}
                      ></span>
                      <span className="font-medium">{data.label}</span>
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
      )}
    </UserLayout>
  );
}
