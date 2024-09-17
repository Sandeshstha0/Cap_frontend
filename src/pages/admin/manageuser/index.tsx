import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout'
import Link from 'next/link';
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

export default function UserManagement() {
   // Sample data for users
   const [users, setUsers] = useState([
    { Name: 'Sandesh Shrestha', Email: 'john.doe@example.com', Details: 'view users', status: 'Active' },
   
  ]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <DefaultLayout>
      {/* Page Heading */}
      <div className='bg-white text-left text-primary font-bold px-4 text-2xl lg:px-6 py-6'>
        User Management
      </div>
      <div className="w-full mt-4 text-right md:w-5/6 ">
        <input
          type="text"
          placeholder="Search by email"
          className="border rounded w-100 py-2 px-3  border-gray mt-6 text-gray-700 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* User Table */}
      <div className="mb-5 w-full mt-10 bg-white md:w-5/6 px-6">
        <div className="-mx-4 sm:-mx-8 px-4  sm:px-8 py-4 ">
          <div className="inline-block min-w-full shadow-md ">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="px-5 py-5 border-b border-gray bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Sandesh Shrestha</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">sandesh@gmail.com</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray bg-white text-sm">
                  <Link href="/" className="text-primary hover:text-secondary font-bold">
                  view users
                  </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative w-4 h-4"><MdDelete /></span>
                    </span>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
