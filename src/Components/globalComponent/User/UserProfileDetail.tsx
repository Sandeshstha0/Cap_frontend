import useFetchProtectedData from '@/hooks/useFetchProtectedData';
import React from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { MdOutlineMoneyOff } from 'react-icons/md'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
interface UserData {
    data: {
      firstname: string;
      secondname: string;
      email: string;
    };
  }
  interface BudgetData {
    data: {
      totalIncome: number;
      totalExpense: number;
      totalBudget: number;
      // Add any other fields you expect from the API response here
    };
  }

export default function UserProfileDetail() {
    const {
        data: protectedData,
        error: apiError,
        refetchData,
      } = useFetchProtectedData<UserData>("/user");
      const { data: protectedata, error: apierror } =
        useFetchProtectedData<BudgetData>("/budgets");
  return (
    <div className="mt-8 space-y-6 text-lg font-medium text-gray-800">
                 <div className="flex items-center justify-between border-b pb-4">
                   <h1 className="flex items-center space-x-2">
                     <RiMoneyDollarCircleFill className="text-blue-600 text-2xl" />
                     <span>Current Budget:</span>
                   </h1>
                   <span className="font-semibold text-2xl text-blue-600">
                     {protectedata?.data?.totalBudget ?? "Loading..."}
                   </span>
                 </div>
                 <div className="flex items-center justify-between border-b pb-4">
                   <h1 className="flex items-center space-x-2">
                     <GiTakeMyMoney className="text-green-600 text-2xl" />
                     <span>Total Income:</span>
                   </h1>
                   <span className="font-semibold text-2xl text-green-600">
                     {protectedata?.data?.totalIncome ?? "N/A"}
                   </span>
                 </div>
                 <div className="flex items-center justify-between">
                   <h1 className="flex items-center space-x-2">
                     <MdOutlineMoneyOff className="text-red-600 text-2xl" />
                     <span>Total Expense:</span>
                   </h1>
                   <span className="font-semibold text-2xl text-red">
                     {protectedata?.data?.totalExpense ?? "N/A"}
                   </span>
                 </div>
               </div>
  )
}
