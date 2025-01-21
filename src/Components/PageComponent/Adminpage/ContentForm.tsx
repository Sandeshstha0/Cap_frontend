import { createOrUpdateContent } from '@/service/contentService';
import React, { useState } from 'react';


const ContentForm: React.FC = () => {
  const [content, setContent] = useState({
    firstName: '',
    secondName: '',
    description: '',
    content2: '',
    content21: '',
    content3: '',
    content31: '',
    content32: '',
    content33: '',
    aboutUs: '',
    aboutUsDescription: '',
    link1: '',
    link2: '',
    link3: '',
    link4: '',
    mail: '',
    phoneNumber: '',
  });

  const [images, setImages] = useState<{
    logo: File | null;
    mainImage: File | null;
    content3Image: File | null;
    aboutUsImage: File | null;
  }>({
    logo: null,
    mainImage: null,
    content3Image: null,
    aboutUsImage: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setImages((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(content).forEach((key) => {
      formData.append(key, (content as any)[key]);
    });

    Object.keys(images).forEach((key) => {
      if ((images as any)[key]) {
        formData.append(key, (images as any)[key]);
      }
    });

    try {
      await createOrUpdateContent(formData);
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={content.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Second Name</label>
        <input
          type="text"
          name="secondName"
          value={content.secondName}
          onChange={handleInputChange}
          placeholder="Second Name"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={content.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 w-full"
        ></textarea>
      </div>
      <div>
        <label>Content 2</label>
        <input
          type="text"
          name="content2"
          value={content.content2}
          onChange={handleInputChange}
          placeholder="Content 2"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Content 21</label>
        <input
          type="text"
          name="content21"
          value={content.content21}
          onChange={handleInputChange}
          placeholder="Content 21"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Content 3</label>
        <input
          type="text"
          name="content3"
          value={content.content3}
          onChange={handleInputChange}
          placeholder="Content 3"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Content 31</label>
        <input
          type="text"
          name="content31"
          value={content.content31}
          onChange={handleInputChange}
          placeholder="Content 31"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>About Us</label>
        <textarea
          name="aboutUs"
          value={content.aboutUs}
          onChange={handleInputChange}
          placeholder="About Us"
          className="border p-2 w-full"
        ></textarea>
      </div>
      <div>
        <label>About Us Description</label>
        <textarea
          name="aboutUsDescription"
          value={content.aboutUsDescription}
          onChange={handleInputChange}
          placeholder="About Us Description"
          className="border p-2 w-full"
        ></textarea>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="mail"
          value={content.mail}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={content.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Logo</label>
        <input type="file" name="logo" onChange={handleFileChange} className="border p-2 w-full" />
      </div>
      <div>
        <label>Main Image</label>
        <input type="file" name="mainImage" onChange={handleFileChange} className="border p-2 w-full" />
      </div>
      <div>
        <label>Content 3 Image</label>
        <input type="file" name="content3Image" onChange={handleFileChange} className="border p-2 w-full" />
      </div>
      <div>
        <label>About Us Image</label>
        <input type="file" name="aboutUsImage" onChange={handleFileChange} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Save Content
      </button>
    </form>
  );
};

export default ContentForm;
