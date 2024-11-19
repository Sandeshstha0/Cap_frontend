/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";
import { getPost } from "@/service/landingService"; // Ensure you have this service for deleting a post
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import DeleteModal from "@/Components/PageComponent/Adminpage/DeleteModal";
import Button from "@/Components/Button";
import { slideInVariants, staggerContainer } from "@/utils/motion";
import { deleteUserPost } from "@/service/userService";

interface Post {
  id: number;
  title: string;
  description: string;
  imageType: string;
  imageData: string;
  createdAt: string;
  slug: string;
}

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [posts, setPosts] = useState<{ data: Post[] }>({ data: [] });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true); // Ensures the UI is rendered only after the component has mounted on the client side
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    fetchPosts();
  }, []);

  const openDeleteModal = (id: number) => {
    setSelectedPostId(id);
    setDeleteModalState(true);
  };

  const deletePost = async () => {
    if (selectedPostId === null) return;
    try {
      await deleteUserPost(selectedPostId.toString()); // Call the delete API with the selected post ID
      setPosts((prev) => ({
        data: prev.data.filter((post) => post.id !== selectedPostId), // Remove the deleted post
      }));
      setDeleteModalState(false); // Close the modal
      setSelectedPostId(null); // Reset the selected post ID
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete the post"
      );
    }
  };

  if (!mounted) return null;

  return (
    <DefaultLayout>
      <div className="bg-white p-6">
        <h1 className="p-4 text-2xl font-semibold">User Posts</h1>

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="show"
        >
          <section className="pt-12 text-black pb-10 lg:pt-[40px] lg:pb-20">
            <div className="container mx-auto">
              <motion.div
                className="-mx-4 flex flex-wrap"
                variants={staggerContainer(0.4, 0.4)}
                initial="hidden"
                animate="show"
              >
                {posts.data
                  .filter((post) =>
                    post.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((post) => (
                    <motion.div
                      key={post.id}
                      className="w-full px-4 md:w-1/2 lg:w-1/3"
                      variants={slideInVariants}
                    >
                      <div className="mx-auto mb-10 max-w-[450px] rounded-lg  shadow-lg overflow-hidden">
                        <div className="mb-8">
                          <img
                            src={`data:${post.imageType};base64,${post.imageData}`}
                            alt={post.title}
                            className="w-full h-52 object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <span className="bg-primary mb-5 inline-block rounded py-1 px-4 text-center text-xs font-semibold leading-loose text-white">
                          {new Date(post.createdAt).toLocaleString()}
                          </span>
                          <h3>
                            <Link
                              href={`/admin/managepost/${post.slug}`}
                              className="text-dark hover:text-primary mb-4 inline-block text-xl font-semibold"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-body-color text-base">
                            {post.description.length > 100
                              ? post.description.substring(0, 100) + "..."
                              : post.description}
                          </p>
                          <div className="mt-6 flex items-center justify-between">
                            {/* Default Button */}
                            <Link
                              href={`/admin/managepost/${post.slug}`}
                              >
                            <button
                              type="button"
                              className="text-black font-semibold text-base bg-yellow-400 focus:ring-4  rounded-full  px-6 py-2 shadow-sm focus:outline-none"
                            >
                              View
                            </button>
                            </Link>

                            {/* Delete Button */}
                            <Button
                              onClick={() => openDeleteModal(post.id)}
                              label="Delete"
                                />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </section>
        </motion.div>

        {/* Delete Modal */}
        {deleteModalState && (
          <DeleteModal
            isOpen={deleteModalState}
            closeModal={() => setDeleteModalState(false)}
            deletePost={deletePost}
          />
        )}
      </div>
    </DefaultLayout>
  );
}
