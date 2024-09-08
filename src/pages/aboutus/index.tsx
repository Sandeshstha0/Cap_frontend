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
      <div className='relative rounded-b h-80 bg-white mt-18'>
        <img src='/72.png' className='object-cover w-full h-60' alt='Background' />

        {/* Container for the image and text */}
        <div className='absolute bottom-0  transform -translate-x-1/2 mb-4 sm:left-125 sm:transform-none '>
          {/* Text above the image */}
          <h2 className='text-3xl font-semibold text-gray-800 mb-3 text-white  border-gray-800 text-center '>
            About Us
          </h2>

          {/* About Us image */}
          <img src='/aboutus.png' className='object-cover border-4 border-white w-100 h-50 rounded-lg' alt='About Us' />
        </div>

      </div>
      <div className='bg-white text-center'>
        <p className='px-32 py-6 flex justify-around'>
          A Budget Expert is a financial professional who specializes in creating, analyzing, and managing budgets for individuals, businesses, or organizations.hey are responsible for planning and developing budgets that align with financial goals, monitoring spending, and ensuring that resources are allocated efficiently. By analyzing financial data, they provide insights and recommendations for cost-saving measures and financial strategies.
          A Budget Expert is a financial professional who specializes in creating, analyzing, and managing budgets for individuals, businesses, or organizations.hey are responsible for planning and developing budgets that align with financial goals, monitoring spending, and ensuring that resources are allocated efficiently. By analyzing financial data, they provide insights and recommendations for cost-saving measures and financial strategies.
          A Budget Expert is a financial professional who specializes in creating, analyzing, and managing budgets for individuals, businesses, or organizations.hey are responsible for planning and developing budgets that align with financial goals, monitoring spending, and ensuring that resources are allocated efficiently. By analyzing financial data, they provide insights and recommendations for cost-saving measures and financial strategies.
        </p>

        <div className='px-24 py-4 flex justify-start'>
          <Button label="Learn More" onClick={handleClick} variant="primary" />
        </div>

      </div>
    </Layout>
  );
};

export default AboutUs;
