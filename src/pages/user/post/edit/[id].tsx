import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles
import { useForm } from "react-hook-form"; // Import useForm

interface Post {
  id: number;
  title: string;
  description: string;
  content: string; // Assuming this is the content for the post
  imageData: string; // Base64 image data (if applicable)
  data: {
    title: string;
    description: string;
  };
}

const EditPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [editorContent, setEditorContent] = useState<string>(''); // For ReactQuill content
  const [image, setImage] = useState<File | null>(null); // For image upload
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined' && id) { // Ensure this runs only on the client side
      const fetchPost = async () => {
        try {
          console.log("Fetching post with id:", id); // Debug log
          const response = await axiosInstance.get(`http://localhost:8080/api/v1/posts/${id}`);
          console.log("Post fetched successfully:", response.data); // Debug log
          
          // Set fetched post data
          setPost(response.data);
          
          // Set form values for title, description, and content
          setValue("title", response.data.title); // Set title value
          setValue("description", response.data.description); // Set description value
          setEditorContent(response.data.content); // Set content (HTML)

        } catch (err) {
          console.error("Error fetching post:", err);
        } finally {
          setLoading(false); // Hide loading indicator once data is fetched
        }
      };
      fetchPost();
    } else {
      console.log("No id found in router.query or running on the server"); // Debug log
    }
  }, [id, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", editorContent);
      if (image) {
        formData.append("image", image); // Append the selected image
      }

      await axiosInstance.put(`/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/user/profile`); // Navigate to the updated post
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  return (
    <UserLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title 
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder={post?.data.title}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              defaultValue={post?.description || ""} // Use the fetched description here
              {...register("description", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder={post?.data.description}
            />
          </div>

          {/* ReactQuill Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              className="mt-1 h-48"
              theme="snow"
              placeholder="Write something amazing..."
            />
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default EditPost;
