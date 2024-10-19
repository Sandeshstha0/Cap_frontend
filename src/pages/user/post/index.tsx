/* eslint-disable react/no-unescaped-entities */
import Button from "@/Components/Button";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import { PostData } from "@/Data/Data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {};

  return (
    <UserLayout>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-center mb-6 p-4 w-full">
          <button className="  inline-flex items-center justify-center gap-2 bg-gray-200 px-6 py-2 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition">
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

          <div className="flex items-center ml-auto space-x-4">
            {/* Search Bar */}
            <div className="relative  flex items-center w-full max-w-md">
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

            <button className="bg-orange-500 w-1/2 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
              <Link href="/user/post/createPost">+ Create Post</Link>
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-gray-50 px-2 lg:px-6  py-3 mt-2 mb-6">
          <div className=" rounded-lg mt-5">
            {PostData?.filter((role: any) =>
              role.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((post, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row bg-white shadow-lg space-y-4 lg:space-y-0 lg:space-x-4 p-6 justify-between items-start mb-5"
              >
                {/* Blog Content */}
                <div className="w-full lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl text-black font-bold mb-2">
                      {post.title}
                    </h2>
                    <div
                      className="text-gray-500 font-normal mt-4"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.detail.length > 150
                            ? `${post.detail.substring(0, 150)}...`
                            : post.detail,
                      }}
                    />
                    <div className="flex items-center mb-2">
                      <p className="ml-4 text-black mt-6">{post.time}</p>
                    </div>
                  </div>
                  <div className="flex justify-start mt-6 lg:mt-">
                    <Link href={`/user/post/${post.slug}`}>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Blog Image */}
                <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
