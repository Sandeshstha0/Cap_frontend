import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout';
import { PostData } from '@/Data/Data';
import Image from 'next/image';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // This ensures the UI is rendered only after the component has mounted on the client side
  }, []);

  const handleClick = (id: any) => {
    console.log(`Delete post with id: ${id}`);
  };

  // If not mounted yet, return null to avoid SSR/CSR mismatch
  if (!mounted) return null;

  return (
    <DefaultLayout>
      <div className="bg-white p-6">

        <h1 className='p-4 text-2xl font-semibold'>Use Posts</h1>
        {/* Header with Filter and Search */}
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

          {/* Search Bar */}
          <div className="relative flex items-center w-full max-w-md">
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
              className="w-full border border-gray-300 bg-white rounded-lg pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
            />
          </div>
        </div>

        {/* Grid with Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PostData?.filter((role: any) =>
            role.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col">
              <div className="rounded-lg cursor-pointer bg-white flex flex-col flex-1">
                {/* Image Section */}
                <div className="w-full h-40 overflow-hidden mb-4 rounded-t-lg">
                  <Image
                    src={item.image}
                    alt="Post Image"
                    width={600}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="p-2 text-left flex-1">
                  <p className="text-xs md:text-sm text-gray-500 mb-2">{item.time}</p>
                  <h2 className="font-semibold text-lg md:text-xl text-gray-800 mb-3">{item.title}</h2>

                  <div
                    className="text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: item.description.length > 50
                        ? `${item.description.substring(0, 50)}...`
                        : item.description,
                    }}
                  />
                </div>

                {/* Action Button at Bottom Right */}
                <div className="text-right mt-auto">
                  <Button label="Delete" onClick={() => handleClick(item.id)} variant="primary" />
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
