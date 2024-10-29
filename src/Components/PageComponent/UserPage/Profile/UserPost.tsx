/* eslint-disable @next/next/no-img-element */
import { PostData } from "@/Data/Data";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion
import { slideInVariants, staggerContainer } from "@/utils/motion";

export default function UserPost() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <motion.div
      className="bg-white"
      variants={staggerContainer(0.1, 0.1)} // Use your stagger container variant
      initial="hidden"
      animate="show"
    >
      <div className="p-4">
        <div className="text-black  px-4  text-3xl font-semibold">
          <h1> Posts</h1>
        </div>

        <section className="pt-12 text-black pb-10 lg:pt-[40px] lg:pb-20">
          <div className="container mx-auto">
            <motion.div
              className="-mx-4 flex flex-wrap"
              variants={staggerContainer(0.4, 0.4)}
              initial="hidden"
              animate="show"
            >
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
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full"
                      />
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
      </div>
    </motion.div>
  );
}
