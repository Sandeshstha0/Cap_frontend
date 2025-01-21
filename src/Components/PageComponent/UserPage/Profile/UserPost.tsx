/* eslint-disable @next/next/no-img-element */
import { PostData } from "@/Data/Data";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import { slideInVariants, staggerContainer } from "@/utils/motion";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { LiaUserEditSolid } from "react-icons/lia";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  slug: string;
  data: any;
  imageType: string; // This represents the type of the image
  imageData: string; // Assuming this is a base64 encoded string
}

export default function UserPost() {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize as an empty array
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // For navigating after edit/delete

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/posts/user-posts");
        setPosts(response.data.data); // Directly set response.data based on your structure
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      // Remove the deleted post from the local state
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const handleEdit = (postId: number) => {
    router.push(`/user/post/edit/${postId}`); // Navigate to an edit page
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>; // Handle the case when there are no posts
  }

  return (
    <motion.div
      className="bg-white rounded-lg p-2"
      variants={staggerContainer(0.1, 0.1)} // Use your stagger container variant
      initial="hidden"
      animate="show"
    >
      <div className="p-4">
        <div className="text-black   text-3xl font-semibold">
          <h1> Your Posts</h1>
        </div>

        <section className=" text-black pb-10 lg:pt-[40px] lg:pb-20">
          <div className="container mx-auto">
            <motion.div
              className="-mx-4 flex flex-wrap"
              variants={staggerContainer(0.4, 0.4)}
              initial="hidden"
              animate="show"
            >
              {posts
                .filter((post) =>
                  post.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((post) => (
                  <motion.div
                    key={post.id}
                    className="w-full px-4 md:w-1/2 lg:w-1/3"
                    variants={slideInVariants} // Use your slide-in variants
                  >
                    <div className="mx-auto mb-10 max-w-[450px] rounded-lg bg-white shadow-lg overflow-hidden">
                      <div className="relative ">
                        <img
                          src={`data:${post.imageType};base64,${post.imageData}`}
                          alt={post.title}
                          className="w-full"
                        />
                        <button
                          onClick={() => handleEdit(post.id)}
                          className="absolute text-lg top-2  right-2 rounded-full bg-white py-2 px-2 text-black font-bold hover:bg-orange-400 hover:scale-125"
                        >
                          <LiaUserEditSolid />
                        </button>
                      </div>
                      <div className="p-6">
                        <span className=" mb-5  inline-block rounded py-1  text-center text-sm font-semibold leading-loose text-black">
                          {new Date(post.createdAt).toLocaleString()}
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
                          {post.description.length > 100
                            ? post.description.substring(0, 100) + "..."
                            : post.description}
                        </p>
                        <div className="flex justify-between items-center mt-6 gap-2">
                          {/* Read More Link */}
                          <Link
                            href={`/posts/${post.slug}`} // Assuming you have a dynamic route for each post
                            className="rounded bg-orange-400 text-center p-2 w-full text-white font-semibold shadow-md transition hover:bg-opacity-90 hover:shadow-lg"
                          >
                            Read More
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="flex items-center justify-center gap-2 w-full rounded bg-red p-2 text-white font-semibold shadow-md transition hover:bg-red hover:shadow-lg"
                          >
                            <MdDelete className="text-lg" />
                            Delete
                          </button>
                        </div>
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
