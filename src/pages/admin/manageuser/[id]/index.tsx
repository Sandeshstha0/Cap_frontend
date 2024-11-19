/* eslint-disable @next/next/no-img-element */
import Button from "@/Components/Button";
import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";
import {
  deleteUserPost,
  getPostbyUserID,
  getUserById,
} from "@/service/userService";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "@/Components/PageComponent/Adminpage/DeleteModal";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  slug: string;
  imageType: string;
  imageData: string;
}

const UserDetail: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteModalState, setDeleteModalState] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUserDetails(id as string);
      fetchUserPosts(id as string);
    }
  }, [id]);

  const fetchUserDetails = async (userId: string) => {
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      toast.error("Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      const data = await getPostbyUserID(userId);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to load posts.");
    }
  };

  const openDeleteModal = (postId: number) => {
    setPostToDelete(postId);
    setDeleteModalState(true);
  };

  const deletePost = async () => {
    if (postToDelete === null) return;
  
    try {
      await deleteUserPost(postToDelete.toString()); // Convert to string
      toast.success("Post deleted successfully!");
      setPosts((prev) => prev.filter((post) => post.id !== postToDelete));
      setDeleteModalState(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post.");
    }
  };
  

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-blue-500 rounded-full animate-spin w-16 h-16"></div>
        </div>
      </DefaultLayout>
    );
  }

  if (!user) {
    return (
      <DefaultLayout>
        <div className="text-center mt-10">
          <p className="text-gray-700">User not found.</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <ToastContainer />
      <div className="bg-white px-6 py-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          User Details
        </h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {/* User Info */}
            <div>
              <p className="text-gray-600 font-medium">First Name:</p>
              <p className="text-gray-800">{user.firstname}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Last Name:</p>
              <p className="text-gray-800">{user.lastname}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Email:</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Status:</p>
              <p
                className={`font-bold ${
                  user.blocked ? "text-red-500" : "text-green-500"
                }`}
              >
                {user.blocked ? "Blocked" : "Active"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Posts</h3>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col"
                >
                  <div className="rounded-lg bg-white flex flex-col flex-1">
                    <div className="w-full h-40 overflow-hidden mb-4 rounded-t-lg">
                      <Image
                        src={`data:${item.imageType};base64,${item.imageData}`}
                        alt="Post Image"
                        width={600}
                        height={400}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-2 text-left flex-1">
                      <p className="text-xs md:text-sm text-gray-500 mb-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <h2 className="font-semibold text-lg md:text-xl text-gray-800 mb-3">
                        {item.title}
                      </h2>
                      <div
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.description.length > 50
                              ? `${item.description.substring(0, 50)}...`
                              : item.description,
                        }}
                      />
                    </div>
                    <div className="text-right mt-auto">
                      <Button
                        label="Delete"
                        onClick={() => openDeleteModal(item.id)}
                        variant="primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              This user has not created any posts.
            </p>
          )}
        </div>
      </div>
      {deleteModalState && (
        <DeleteModal
          isOpen={deleteModalState}
          closeModal={() => setDeleteModalState(false)}
          deletePost={deletePost}
        />
      )}
    </DefaultLayout>
  );
};

export default UserDetail;
