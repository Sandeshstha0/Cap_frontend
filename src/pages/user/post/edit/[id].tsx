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
  imageData: string; // Base64 image data
}

const EditPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [editorContent, setEditorContent] = useState<string>(''); // For ReactQuill content
  const [image, setImage] = useState<File | null>(null); // For image upload
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get(`/posts/${id}`);
          setPost(response.data);
          setValue("title", response.data.title); // Set form values
          setValue("description", response.data.description);
          setEditorContent(response.data.content); // Set content
        } catch (err) {
          console.error("Error fetching post:", err);
        }
      };
      fetchPost();
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
      router.push(`/posts/${id}`); // Navigate to the updated post
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

 

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
              placeholder="Enter the post title"
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
              {...register("description", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a brief description"
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
              placeholder="Write your content here..."
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
