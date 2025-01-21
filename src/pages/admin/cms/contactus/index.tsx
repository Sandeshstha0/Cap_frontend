import React from 'react';
import { useForm } from 'react-hook-form';
import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout';
import axiosInstance from '@/utils/axiosInstance';

const FullContentForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    
    // Append all fields
    Object.keys(data).forEach((key) => {
      if (key.includes('Image') || key === 'logo') {
        formData.append(key, data[key][0]); // File inputs
      } else {
        formData.append(key, data[key]); // Other inputs
      }
    });
  
    // Log the formData
    console.log('FormData content:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    try {
      const response = await axiosInstance.post('http://localhost:8080/api/v1/contents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Content created successfully!');
    } catch (error: any) {
      console.error('Error:', error.response || error.message);
      alert('Failed to create content. Please try again.');
    }
  };
  
  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Create Full Content</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                {...register('firstName', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Second Name</label>
              <input
                type="text"
                {...register('secondName', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register('description', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </div>

          {/* Content Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {['content2', 'content21', 'content3', 'content31', 'content32', 'content33'].map((field) => (
              <div key={field}>
                <label className="block text-gray-700">{field.replace(/([0-9])/g, ' $1')}</label>
                <input
                  type="text"
                  {...register(field)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>

          {/* About Us Section */}
          <div className="mt-4">
            <label className="block text-gray-700">About Us</label>
            <textarea
              {...register('aboutUs')}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">About Us Description</label>
            <textarea
              {...register('aboutUsDescription')}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index + 1}>
                <label className="block text-gray-700">{`Link ${index + 1}`}</label>
                <input
                  type="text"
                  {...register(`link${index + 1}`)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700">Mail</label>
              <input
                type="email"
                {...register('mail', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                {...register('phoneNumber', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* File Uploads */}
          {['logo', 'mainImage', 'content3Image', 'aboutUsImage'].map((fileField) => (
            <div className="mt-4" key={fileField}>
              <label className="block text-gray-700">{fileField.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="file"
                {...register(fileField)}
                className="w-full"
                accept="image/*"
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default FullContentForm;
