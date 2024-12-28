import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart'; // Ensure this is the correct import
import useFetchProtectedData from '@/hooks/useFetchProtectedData';
import Link from 'next/link';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string | null;
  type: string;
}

interface Category {
  id: number;
  name: string;
  type: string;
  transactions: Transaction[];
  totalAmount: number;
}

interface ProtectedData {
  data: Category[];
}

const generateColor = (index: number): string => {
  const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#43aa8b', '#577590'];
  return colors[index % colors.length];
};

const PieChartData: React.FC = () => {
  

  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<ProtectedData>('/categories');

  if (!protectedData) {
    return <p>Loading...</p>;
  }

  const pieChartData = protectedData.data.map((category, index) => ({
    id: category.id,
    label: category.name,
    value: category.totalAmount,
    color: generateColor(index),
  }));

  return (
    <div className="container bg-white mt-6 rounded-lg p-4 sm:p-10">
      <h1 className="font-semibold text-lg mb-4">PieChartData</h1>
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
