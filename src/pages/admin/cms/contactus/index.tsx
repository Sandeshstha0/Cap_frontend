import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmits: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axiosInstance.post("/contact-us", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(previewUrl);
    }
  };

  return (
    <DefaultLayout>
      <ToastContainer />
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(handleSubmits)}>
        
          {/* Image Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-70 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-50 inline-flex justify-center items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default ContactUs;
