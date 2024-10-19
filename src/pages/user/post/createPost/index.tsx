import React, { useState } from "react";
import UserLayout from "@/Components/globalComponent/User/Layouts/UserLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill's styles
import { useForm } from "react-hook-form";

export default function Index() {
  const { register, handleSubmit } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Editor Content:", editorContent);
    console.log("Selected Image:", image);
    // Handle form submission logic
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <UserLayout>
      <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Create a Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
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
              className="w-full inline-flex justify-center items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow  transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}
