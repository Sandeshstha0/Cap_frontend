import React from 'react';

const IncomeSection = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl font-bold mb-4">17000 Total Income this month</div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Category Detail</h2>
          <button className="bg-orange-500 text-white py-2 px-4 rounded">Add New Category</button>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex justify-between text-gray-600 mb-2">
            <div>Category</div>
            <div>Transactions</div>
            <div>Amount</div>
            <div>Action</div>
          </div>

          <div className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
            <div>Teaching</div>
            <div>12</div>
            <div>13000</div>
            <div className="flex space-x-2">
              <button className="text-blue-500">✏️</button>
              <button className="text-red-500">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeSection;
