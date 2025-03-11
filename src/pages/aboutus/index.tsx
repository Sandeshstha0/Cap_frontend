/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideInVariants } from "@/utils/motion";
import useFetchProtectedData from '@/hooks/useFetchProtectedData';

interface BudgetExpert {
  aboutUs: string;
  aboutUsDescription: string;
  aboutUsImagePath: string;
}

const AboutUs = () => {
  const {
    data,
    error: apiError,
    refetchData,
  } = useFetchProtectedData<BudgetExpert>("http://localhost:8080/api/v1/contents/1");

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Layout>
      {/* Main container with responsive height */}
      <motion.div
        className='relative rounded-b h-80 sm:h-96 lg:h-112'
        variants={slideInVariants}
        initial="hidden"
        animate="show"
      >
        {/* Background image */}
        <img
          src='/72.png'
          className='object-cover w-full h-60 sm:h-72 lg:h-80'
          alt='Background'
        />

        {/* About Us Text & Image Container */}
        <div className='absolute bottom-0 w-full flex flex-col items-center justify-center'>
          {/* About Us Title */}
          <motion.h2
            className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 border-b-2 border-gray-800 px-4'
            variants={fadeIn('up', 'tween', 0.2, 0.6)}
            initial="hidden"
            animate="show"
          >
            {data?.aboutUs || "About Us"}
          </motion.h2>

          {/* About Us Image */}
          {data?.aboutUsImagePath && (
            <motion.img
              src={data.aboutUsImagePath.startsWith("http") ? data.aboutUsImagePath : `/${data.aboutUsImagePath}`}
              className='object-cover border-4 border-white w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg shadow-md'
              alt='About Us'
              variants={fadeIn('up', 'tween', 0.4, 0.6)}
              initial="hidden"
              animate="show"
            />
          )}
        </div>
      </motion.div>

      {/* About Us Description Section */}
      <motion.div
        className='bg-white text-center py-6'
        variants={fadeIn('up', 'tween', 0.6, 0.6)}
        initial="hidden"
        animate="show"
      >
        <p className='px-6 sm:px-16 lg:px-32 text-sm sm:text-base lg:text-lg leading-relaxed'>
          {data?.aboutUsDescription || "No description available at the moment."}
        </p>

        {/* Learn More Button */}
        <div className='px-6 sm:px-16 lg:px-24 py-4 flex justify-center'>
          <Button label="Learn More" onClick={handleClick} variant="primary" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutUs;
