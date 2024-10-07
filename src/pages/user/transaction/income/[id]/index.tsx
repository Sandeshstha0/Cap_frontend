import UserLayout from '@/Components/globalComponent/User/Layouts/UserLayout';
import NewIncomeModalProps from '@/Components/PageComponent/UserPage/Transactions/AddIncomeModal';
import { Incomedata } from '@/Data/Income';
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function Index() {
  const[editmodalState, seteditModalState]=useState(false);
  
    const router=useRouter();
    const {id}= router.query;
    const[searchTerm, setSearchTerm]=useState('');
    //Open edit modal//
    const openEditModal=()=>{
      seteditModalState(true);
    }

    const income= Incomedata.find((p)=>p.id===parseInt(id as string));
      return (
        <UserLayout>


      
      {/* Container with white background and shadow */}
      <div className="bg-white w-full p-6 mt-6 space-y-6 rounded-lg shadow-lg">
        {/* Search and Filter Section */}
        <div className="flex justify-between items-center pb-4 border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Sort by Dropdown */}
            <div className="flex justify-between bg-white items-center px-2 mb-4">
            <div className="flex items-center mt-4 space-x-3">
              <span>Sort by</span>
              <select className="border border-gray-300  rounded-md px-2 py-2">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
           
            </div>
            </div>

            {/* Search Bar */}
            <div className="flex justify-between space-x-3 mt-4 items-center  mb-4">
              <input 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                className="search-bar border border-gray-300 focus:outline-none w-150 focus:border-black px-4 py-2 rounded"
              />
            </div>
            <button className="bg-orange-500 text-white px-2 py-2 rounded-md hover:bg-orange-600"onClick={openEditModal}>
              + Add Income
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
                  Category
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
                  Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-l font-medium text-black tracking-wider"
                  >
                 Description
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
                
                {income?.transaction.map((item,index)=>(

               
                <tr key={index}>
                  
                
                  <td className="px-6 py-4 whitespace-nowrap">
                 
                    </td>
                   
                  <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                  
                  
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
                 ))}
              </tbody>
            </table>
            {editmodalState && (
          <NewIncomeModalProps
            isOpen={editmodalState}
            closeModal={() => seteditModalState(false)}
            />
          )}
    </div>
        </div>
    </UserLayout>
  );
}
