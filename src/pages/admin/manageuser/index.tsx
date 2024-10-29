import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout';
import RejectModal from '@/Components/PageComponent/Adminpage/RejectModal';
import useFetchProtectedData from '@/hooks/useFetchProtectedData';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

interface User {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const { data: protectedData, error: apiError, refetchData } = useFetchProtectedData<User[]>('/admin/users');

 

  // State for search term and modal
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [rejectModalState, setRejectModalState] = useState<boolean>(false);

  // Open modal function
  const openRejectModal = () => {
    setRejectModalState(true);
  };

  return (
    <DefaultLayout>
      <div className="bg-white">
        {/* Page Heading */}
        <div className="text-left text-primary font-semibold px-6 py-6 text-3xl">
          User Management
        </div>

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6 px-6">
          <button className="inline-flex items-center justify-center gap-2 text-black px-6 py-2 text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition">
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

          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm w-64"
            />
            <svg
              className="absolute left-3 top-2.5 fill-current text-gray-500"
              width="16"
              height="16"
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
          </div>
        </div>

        {/* User Table */}
        <div className="mb-1 w-full mt-1 bg-white px-6">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {protectedData?.filter((user: User) => 
                  user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((user: User, index: number) => (
                  <tr key={user.id}> {/* Use user.id as the key for better performance */}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.firstname} {user.lastName}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link href={`/admin/manageuser/${user.id}`} className="text-blue-600 hover:underline">
                        View Activity
                      </Link>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button onClick={openRejectModal} className="text-red-600 hover:text-red-800 transition">
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reject Modal */}
        {rejectModalState && (
          <RejectModal isOpen={rejectModalState} closeModal={() => setRejectModalState(false)} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default UserManagement;
