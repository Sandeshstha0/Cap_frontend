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

    <div>
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
