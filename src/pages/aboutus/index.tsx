/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { fadeIn, slideInVariants } from "@/utils/motion"; // Adjust the import path accordingly
import useFetchProtectedData from '@/hooks/useFetchProtectedData';
interface BudgetExpert {
  aboutUs: string;
  aboutUsDescription: string;
  aboutUsImagePath: string;
}

const AboutUs = () => {
  const {
    data: protectedData,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<BudgetExpert>((`http://localhost:8080/api/v1/contents/1`));
  
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Layout>
      {/* Main container with responsive height */}
      <motion.div
        className='relative rounded-b h-80 sm:h-96 lg:h-112 '
        variants={slideInVariants}
        initial="hidden"
        animate="show"
      >
        {/* Background image with responsive height */}
        <img
          src='/72.png'
          className='object-cover w-full h-60 sm:h-72 lg:h-80'
          alt='Background'
        />

        {/* Container for the image and text */}
        <div className='absolute bottom-0 w-full flex flex-col items-center justify-center sm:translate-x-0 sm:transform-none'>
          {/* Text above the image */}
          <motion.h2
            className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 border-b-2 border-gray-800'
            variants={fadeIn('up', 'tween', 0.2, 0.6)}
            initial="hidden"
            animate="show"
          >
            {protectedData?.aboutUs}
          </motion.h2>

          {/* About Us image */}
          <motion.img
            src='/aboutus.png'
            className='object-cover border-4 border-white w-32 h-32 sm:w-40 sm:h-40 lg:w-100 lg:h-48 rounded-lg'
            alt='About Us'
            variants={fadeIn('up', 'tween', 0.4, 0.6)}
            initial="hidden"
            animate="show"
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className='bg-white text-center'
        variants={fadeIn('up', 'tween', 0.6, 0.6)}
        initial="hidden"
        animate="show"
      >
        <p className='px-6 sm:px-16 lg:px-32 py-6 text-sm sm:text-base lg:text-lg leading-relaxed'>
        {protectedData?.aboutUsDescription}
        </p>

        {/* Button Section */}
        <div className='px-6 sm:px-16 lg:px-24 py-4 flex justify-center'>
          <Button label="Learn More" onClick={handleClick} variant="primary" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutUs;
