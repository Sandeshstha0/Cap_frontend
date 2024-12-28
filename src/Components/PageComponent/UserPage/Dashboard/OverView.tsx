import React from 'react';
import BarGraph from '../Dashboard/BarGraph';
import useFetchProtectedData from '@/hooks/useFetchProtectedData';

// Define types for your data
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

// Color generator function with TypeScript annotations
function generateColor(index: number): string {
  const baseColors = ["#f94144", "#f3722c", "#f8961e"];
  const additionalColors = ["#f9c74f", "#43aa8b", "#577590"];
  return index < baseColors.length ? baseColors[index] : additionalColors[index % additionalColors.length];
}

const OverView: React.FC = () => {
  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<ProtectedData>('/categories'); // Specify the generic type for API response

  // Sort categories by the number of transactions and take the top 2
  const topCategories = protectedData?.data
    ?.sort((a, b) => b.transactions.length - a.transactions.length)
    .slice(0, 2);

  // if (apiError) {
  //   return <p>Error fetching data: {apiError.message}</p>;
  // }

  return (
    <div className="container bg-white mt-6 rounded-lg p-4 sm:p-10">
      <h1 className="font-semibold text-lg">Overview</h1>

      <div className="flex flex-wrap justify-center">
        {topCategories?.map((category, index) => (
          <div key={category.id} className="w-full md:w-1/2 mb-4 p-2 md:p-8 rounded-lg">
            <div className="border-2 rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <p className="font-semibold text-lg">{category.name}</p>
                <h1 className="font-bold text-3xl mt-1">{category.totalAmount}</h1>
              </div>
              <div className="p-3">
                <BarGraph
                  chartData={{
                    labels: category.transactions.map((txn) => txn.description),
                    datasets: [
                      {
                        label: "Transaction Amount",
                        data: category.transactions.map((txn) => txn.amount),
                        backgroundColor: category.transactions.map((_, txnIndex) => generateColor(txnIndex)),
                        borderColor: "black",
                        barThickness: 30,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverView;
