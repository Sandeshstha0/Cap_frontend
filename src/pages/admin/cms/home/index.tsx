/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";
import ModalOpen from "@/Components/PageComponent/Adminpage/Modal";

interface ContentFormProps {
  contentId?: number; // Optional content ID for updating
}

const ContentForm: React.FC<ContentFormProps> = ({ contentId }) => {
  const [formData, setFormData] = useState<any>({
    firstName: "",
    secondName: "",
    description: "",
    content2: "",
    content21: "",
    content3: "",
    content31: "",
    content32: "",
    content33: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [images, setImages] = useState({
    logoImage: null,
    mainImage: null,
    content3Image: null,
  });

  useEffect(() => {
    const contentId = 1;
    if (contentId) {
      // Use the dynamic contentId in the URL
      axiosInstance
        .get(`http://localhost:8080/api/v1/contents/${contentId}`)
        .then((response) => {
          const existingContent = response.data;

          // Log the fetched data to the console
          console.log("Fetched Content:", existingContent);

          // Set form data with fetched content
          setFormData({
            firstName: existingContent.firstName || "",
            secondName: existingContent.secondName || "",
            description: existingContent.description || "",
            content2: existingContent.content2 || "",
            content21: existingContent.content21 || "",
            content3: existingContent.content3 || "",
            content31: existingContent.content31 || "",
            content32: existingContent.content32 || "",
            content33: existingContent.content33 || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
        });
    }
  }, [contentId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setImages((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // Append images if they are selected
    if (images.logoImage) form.append("logoImage", images.logoImage);
    if (images.mainImage) form.append("mainImage", images.mainImage);
    if (images.content3Image)
      form.append("content3Image", images.content3Image);
    const contentId = 1;
    try {
      if (contentId) {
        // Update existing content
        await axiosInstance.put(`/contents/${contentId}`, form);
        alert("Content updated successfully");
      } else {
        // Create new content
        await axiosInstance.post("/contents", form);
        alert("Content created successfully");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    }
  };

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Content Form
        </h2>

        {/* First Name & Second Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Second Name
            </label>
            <input
              type="text"
              name="secondName"
              value={formData.secondName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Fields */}
        {[
          "content2",
          "content21",
          "content3",
          "content31",
          "content32",
          "content33",
        ].map((content, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">{`Content ${
              index + 2
            }`}</label>
            <input
              type="text"
              name={content}
              value={formData[content]}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Image Uploads */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Logo Image
          </label>
          <input
            type="file"
            name="logoImage"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Main Image
          </label>
          <input
            type="file"
            name="mainImage"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Content 3 Image
          </label>
          <input
            type="file"
            name="content3Image"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <h1>sdf{images.logoImage}</h1>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Save Content
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default ContentForm;
