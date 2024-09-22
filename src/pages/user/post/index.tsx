import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";
import { PostData } from "@/Data/Data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Index() {
  return (
    <DefaultLayout>
      {/* Main Content */}
      <div className="bg-gray-50 px-10 py-3 mt-2 mb-6">
        <div className="w-full h-24 rounded-lg flex space-x-5 items-center">
          <Image
            src="/admin.png"
            alt="admin"
            width={50}
            height={50}
            className="h-auto"
          />
          {/* Welcome Section */}
          <div className="text-left px-2 mb-6">
            <h1 className="bg-gray-100 text-black text-2xl font-semibold py-0 mb-2">
              Hello, Sammy!
            </h1>
            <p className="text-black font-normal text-lg">
              Welcome to the Budget Expert, here we manage your daily expenses
              and projects.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 px-10 py-3 mt-2 mb-6">
        {/* User input and post section */}
        <div className="w-full h-24 rounded-lg flex space-x-5 items-center">
          <Image
            src="/admin.png"
            alt="logo"
            width={50}
            height={50}
            className="h-auto"
          />
          <div className="bg-gray-200 rounded-full px-9 py-6 text-black">
            What's on your mind, Sammy?
          </div>
        </div>

        <div className="bg-gray shadow-lg rounded-lg mt-5">
          {PostData.map((post, index) => (
            <div
              key={index}
              className="flex bg-white space-x-4 p-6 flex-col lg:flex-row justify-between items-start mb-5 space-y-4"
            >
              {/* Blog Content */}
              <div className="lg:w-2/3 flex flex-col justify-between">
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
                    <div className="flex">
                      {/* Rating stars can be uncommented if needed */}
                      {/* {Array.from({ length: post.rating }).map((_, starIndex) => (
                <svg
                  key={starIndex}
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.691h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.049 9.403c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.691l1.286-3.975z" />
                </svg>
              ))} */}
                    </div>
                    <p className="ml-4 text-black mt-6">{post.time}</p>
                  </div>
                </div>
                <div className="flex justify-start mt-auto">
                <Link href={`/user/post/${post.slug}`}>
                  <button className="bg-orange-500 text-white mt-8 px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                    Read More
                  </button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 mt-6 lg:mt-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
