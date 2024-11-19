import React, { useState } from "react";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill's styles
import { useForm, SubmitHandler } from "react-hook-form"; // Import types from react-hook-form
import axiosInstance from "@/utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";

interface FormData {
  title: string;
  description: string;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Index: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>(); // Use FormData type
  const [editorContent, setEditorContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // State type for image

  const handleSubmits: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData(); // Create a new FormData object
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", editorContent);
    if (image) {
      formData.append("image", image); // Append image if it exists
    }
    try {
      // Send a POST request to the server
      const response = await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      });
      toast.success(
        "Post created successfully"
      );
      // Handle successful post creation (e.g., redirect, show success message)
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <DefaultLayout>
       <ToastContainer />
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
       
        <form onSubmit={handleSubmit(handleSubmits)}> {/* Corrected here */}
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
          <div className="mt-18">
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
              className="w-full inline-flex justify-center items-center bg-primary text-white px-4 py-2 rounded-lg shadow transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Index;