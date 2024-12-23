import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import AddremainderModalProps from "@/Components/PageComponent/UserPage/Notification/AddremainderModal";
import EditCategoryModal from "@/Components/PageComponent/UserPage/Transactions/ExpenseCategoryModal";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import { useState } from "react";
interface UserData {
  data: {
    firstname: string;
    secondname: string;
  };
}

export default function Expense() {
  const [editmodalState, seteditModalState] = useState(false);

  // Open edit modal
  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<UserData>('/user');
  const openEditModal = () => {
    seteditModalState(true);
  };

  const [transactions] = useState([
    { category: "Food", transactions: 20, amount: 8000 },
  ]);

  return (
    <UserLayout>
      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          {/* Total Expense */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
          Hello, {protectedData?.data?.firstname} {protectedData?.data?.secondname}!
        </h1>
          <p className="text-xl font-medium text-primary mb-6">
            Welcome to Remainder Section
          </p>
        </div>

        <div className="w-full">
          {/* Container with white background and shadow */}
          <div className="bg-white p-6 mt-5 rounded-lg shadow-lg">
            {/* Search and Filter Section */}
            <div className="flex justify-between items-center pb-4  border-gray-200">
              <div className="flex items-center space-x-4">
                {/* Sort by Dropdown */}
                <div className="flex justify-between bg-white items-center px-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <span>Sort by</span>
                    <select className="border border-gray-300 rounded-md px-2 py-2">
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                    </select>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="flex justify-between space-x-3 mt- items-center px-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
                  />
                </div>

                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 "
                  onClick={openEditModal}
                >
                  + Add New
                </button>
              </div>
            </div>
            {/* Table Section */}
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-l font-medium text-black  tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                    >
                      Remark
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">01</td>
                    <td className="px-6 py-4 whitespace-nowrap">12000</td>
                    <td className="px-6 py-4 whitespace-nowrap">Teaching</td>
                    <td className="px-6 py-4 whitespace-nowrap">Got salary</td>
                    <td className="px-6 py-4 whitespace-nowrap">7th july</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {editmodalState && (
          <AddremainderModalProps
            isOpen={editmodalState}
            closeModal={() => seteditModalState(false)}
          />
        )}
      </div>


      
    </UserLayout>
  );
}
