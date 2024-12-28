/* eslint-disable @next/next/no-img-element */
import { PostData } from "@/Data/Data";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import { slideInVariants, staggerContainer } from "@/utils/motion";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  slug: string;
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
            const response = await axiosInstance.get('/posts/user-posts');
            setPosts(response.data); // Directly set response.data based on your structure
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      // Remove the deleted post from the local state
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
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
              {posts?.filter((post) =>
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
                        src={`data:${post.imageType};base64,${post.imageData}`}
                        alt={post.title}
                        className="w-full"
                      />
                    </div>
                    <div className="p-6">
                      <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                        {post.createdAt}
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
                      <a
                        href={`/posts/${post.slug}`} // Assuming you have a dynamic route for each post
                        className="mt-4 inline-block rounded bg-primary py-2 px-4 text-white font-semibold hover:bg-opacity-90"
                      >
                        Read More
                      </a>

                      {/* Edit and Delete Buttons */}
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => handleEdit(post.id)}
                          className="inline-block rounded bg-yellow-500 py-2 px-4 text-white font-semibold hover:bg-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-block rounded bg-red py-2 px-4 text-white font-semibold hover:bg-red-400"
                        >
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
