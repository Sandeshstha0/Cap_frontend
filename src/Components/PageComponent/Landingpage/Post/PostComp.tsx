/* eslint-disable @next/next/no-img-element */
import Button from "@/Components/Button";
import { PostData } from "@/Data/Data";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { motion } from "framer-motion"; // Import motion
import { slideInVariants, staggerContainer } from "@/utils/motion"; // Adjust the path accordingly

export default function PostComp() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      className="bg-slate-100"
      variants={staggerContainer(0.1, 0.1)} // Use your stagger container variant
      initial="hidden"
      animate="show"
    >
      <div className="text-black bg-white px-8 py-4 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center justify-center gap-2 bg-gray-200 px-6 py-2 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
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
          </div>
          {/* Search Bar */}
          <div className="relative flex items-center w-full max-w-md">
            <button className="absolute left-2 top-1/2 -translate-y-1/2 focus:outline-none">
              <svg
                className="fill-current text-gray-500 hover:text-blue-500"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
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
      </div>

      <section className="pt-12 text-black pb-10 lg:pt-[40px] lg:pb-20">
        <div className="container mx-auto">
          <motion.div className="-mx-4 flex flex-wrap" variants={staggerContainer(0.4, 0.4)} initial="hidden" animate="show">
            {PostData?.filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((post) => (
              <motion.div
                key={post.id}
                className="w-full px-4 md:w-1/2 lg:w-1/3"
                variants={slideInVariants} // Use your slide-in variants
              >
                <div className="mx-auto mb-10 max-w-[450px] rounded-lg bg-white shadow-lg overflow-hidden">
                  <div className="mb-8">
                    <img src={post.image} alt={post.title} className="w-full" />
                  </div>
                  <div className="p-6">
                    <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                      {post.time}
                    </span>
                    <h3>
                      <a
                        href="javascript:void(0)"
                        className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-body-color text-base">
                      {post.detail.length > 100
                        ? post.detail.substring(0, 100) + "..."
                        : post.detail}
                    </p>
                    <a
                      href={`/posts/${post.slug}`} // Assuming you have a dynamic route for each post
                      className="mt-4 inline-block rounded bg-primary py-2 px-4 text-white font-semibold hover:bg-opacity-90"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
