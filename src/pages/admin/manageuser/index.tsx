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
     
      <div className="flex justify-between items-center mb-6">
          <button className="inline-flex items-center justify-center gap-2 bg-gray-200 px-6 py-2 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition">
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H16C16.5523 7 17 6.55228 17 6C17 5.44772 16.5523 5 16 5H4ZM6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11H14C14.5523 11 15 10.5523 15 10C15 9.44772 14.5523 9 14 9H6ZM9 13C8.44772 13 8 13.4477 8 14C8 14.5523 8.44772 15 9 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13H9Z"
                fill="currentColor"
              />
            </svg>
            Filter
          </button>
      <button className="absolute left-2 top-1/2 -translate-y-1/2 focus:outline-none">
              <svg
                className="fill-current text-gray-500 hover:text-blue-500"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-100 border mt-20 border-gray-300  text-left bg-white rounded-lg pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
            />
          </div>
      
      {/* User Table */}
      <div className="mb-1 w-full mt-1 bg-white px-6">
        <div className="-mx-8 sm:-mx-10 px-4  sm:px-8 py-4 ">
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
