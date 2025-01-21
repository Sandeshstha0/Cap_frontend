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
    aboutUs: "",
    aboutUsDescription: "",
    link1: "",
    link2: "",
    link3: "",
    link4: "",
    mail: "",
    phoneNumber: "",
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
    aboutUsImage: null,
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
            aboutUs: existingContent.aboutUs || "",
            aboutUsDescription: existingContent.aboutUsDescription || "",
            link1: existingContent.link1 || "",
            link2: existingContent.link2 || "",
            link3: existingContent.link3 || "",
            link4: existingContent.link4 || "",
            mail: existingContent.mail || "",
            phoneNumber: existingContent.phoneNumber || "",
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
    if (images.aboutUsImage) form.append("aboutUsImage", images.aboutUsImage);
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
       <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Open Modal
      </button>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold mb-6 text-center">Content Form</h2>

     

  {/* First Name & Second Name */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <div>
      <label className="block text-gray-700 font-medium mb-2">First Name</label>
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
      <label className="block text-gray-700 font-medium mb-2">Second Name</label>
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
    <label className="block text-gray-700 font-medium mb-2">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      required
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Content Fields */}
  {['content2', 'content21', 'content3', 'content31', 'content32', 'content33'].map((content, index) => (
    <div key={index} className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{`Content ${index + 2}`}</label>
      <input
        type="text"
        name={content}
        value={formData[content]}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ))}

  {/* About Us Fields */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">About Us</label>
    <input
      type="text"
      name="aboutUs"
      value={formData.aboutUs}
      onChange={handleInputChange}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">About Us Description</label>
    <textarea
      name="aboutUsDescription"
      value={formData.aboutUsDescription}
      onChange={handleInputChange}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Link Fields */}
  {['link1', 'link2', 'link3', 'link4'].map((link, index) => (
    <div key={index} className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{`Link ${index + 1}`}</label>
      <input
        type="text"
        name={link}
        value={formData[link]}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ))}

  {/* Contact Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <div>
      <label className="block text-gray-700 font-medium mb-2">Email</label>
      <input
        type="email"
        name="mail"
        value={formData.mail}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Image Uploads */}
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Logo Image</label>
    <input
      type="file"
      name="logoImage"
      onChange={handleImageChange}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Main Image</label>
    <input
      type="file"
      name="mainImage"
      onChange={handleImageChange}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Content 3 Image</label>
    <input
      type="file"
      name="content3Image"
      onChange={handleImageChange}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">About Us Image</label>
    <input
      type="file"
      name="aboutUsImage"
      onChange={handleImageChange}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Display images */}
  <div className="mb-6">
    <img
      src="D:\\uploads\\Screenshot 2025-01-19 184732.png"
      alt="Main Image"
      className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
    />
    <img
      src={images.content3ImagePath}
      alt="Content Image"
      className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
    />
    <img
      src={images.aboutUsImagePath}
      alt="About Us Image"
      className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
    />
    
    <img
      src={`${images.logoImage}`}
      alt="Logo"
      className="w-32 h-32 object-cover rounded-full shadow-sm mb-4"
    />
  </div>


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
<ModalOpen  isOpen={isModalOpen} onClose={handleCloseModal} />
    </DefaultLayout>
  );
};

export default ContentForm;
