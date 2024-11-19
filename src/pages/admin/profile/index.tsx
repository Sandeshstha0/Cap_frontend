import { useState } from "react";
import Image from "next/image";
import DefaultLayout from "@/Components/globalComponent/Admin/Layouts/DefaultLayout";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";

interface AdminData {
    data: {
      firstname: string;
      secondname: string;
    };
  }

export default function AdminProfile() {
    const {
        data: protectedData,
        error: apiError,
        refetchData,
      } = useFetchProtectedData<AdminData>('/admin');
    
  const [profileImage, setProfileImage] = useState("/admin-profile-pic.png"); // Default profile picture
  const [previewImage, setPreviewImage] = useState("");

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DefaultLayout>
   
    <div className="text-left bg-white text-primary font-normal px-4 py-6 md:px-10 md:py-8 lg:px-16 lg:py-10">
    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
        
        </h1>
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={previewImage || profileImage}
              alt="Admin Profile"
              width={50}
              height={50}
              className="w-50 h-50 rounded-full border-2 border-black-700"
            />
            <label
              htmlFor="profilePictureInput"
              className="absolute bottom-10 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
              title="Change Picture"
            >
              ✏️
            </label>
            {/* Hidden File Input */}
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800"> {protectedData?.data?.firstname} {protectedData?.data?.secondname}</h1>
            <p className="text-gray-600">mmelinastha18@gmail.com</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Admin Details */}
        <div className="space-y-4">
          <div className=" space-x-2 justify item-left">
            <span className=" font-semibold text-gray-600">Role:</span>
            <span className="font-medium text-gray-800">Admin</span>
          </div>
          <div className="space-x-2 flex items-center">
            <span className="text-gray-600">Phone Number:</span>
            <span className="font-medium text-gray-800">+977 9745282390</span>
          </div>
          <div className="space-x-2 items-center">
            <span className="text-gray-600">Joined On:</span>
            <span className="font-medium text-gray-800">January 1, 2023</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-blue-600">
            Save Changes
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    
    </DefaultLayout>
  );
}
