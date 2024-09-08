/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import React from 'react';

const AboutUs = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Layout>
      {/* Main container with responsive height */}
      <div className='relative rounded-b h-80 sm:h-96 lg:h-112 bg-white mt-18'>
        {/* Background image with responsive height */}
        <img
          src='/72.png'
          className='object-cover w-full h-60 sm:h-72 lg:h-80'
          alt='Background'
        />

        {/* Container for the image and text */}
        <div className='absolute bottom-0 w-full flex flex-col items-center justify-center sm:translate-x-0 sm:transform-none'>
          {/* Text above the image */}
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 border-b-2 border-gray-800'>
            About Us
          </h2>

          {/* About Us image */}
          <img
            src='/aboutus.png'
            className='object-cover border-4 border-white w-32 h-32 sm:w-40 sm:h-40 lg:w-100 lg:h-48 rounded-lg'
            alt='About Us'
          />
        </div>
      </div>

      {/* Text Section */}
      <div className='bg-white text-center'>
        <p className='px-6 sm:px-16 lg:px-32 py-6 text-sm sm:text-base lg:text-lg leading-relaxed'>
          A Budget Expert is a financial professional who specializes in creating, analyzing, and managing budgets for individuals, businesses, or organizations. They are responsible for planning and developing budgets that align with financial goals, monitoring spending, and ensuring that resources are allocated efficiently. By analyzing financial data, they provide insights and recommendations for cost-saving measures and financial strategies. A Budget Expert is a financial professional who specializes in creating, analyzing, and managing budgets for individuals, businesses, or organizations. They are responsible for planning and developing budgets that align with financial goals, monitoring spending, and ensuring that resources are allocated efficiently. By analyzing financial data, they provide insights and recommendations for cost-saving measures and financial strategies.
        </p>

        {/* Button Section */}
        <div className='px-6 sm:px-16 lg:px-24 py-4 flex justify-center'>
          <Button label="Learn More" onClick={handleClick} variant="primary" />
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
