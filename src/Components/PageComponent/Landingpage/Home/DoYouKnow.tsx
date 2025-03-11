import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeIn, staggerContainer } from "@/utils/motion";

interface DoYouKnowSectionProps {
  data: any;
}

const ContentCard: React.FC<{ label: string, value: string, backgroundColor: string }> = ({ label, value, backgroundColor }) => (
  <motion.div
    className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4 shadow-lg"
    variants={fadeIn('up', 'spring', 0.4, 1)}
  >
    <div className="flex-1">
      <div className="h-8 p-2 rounded-md bg-slate-200 text-black font-semibold text-sm">
        {value}
      </div>
    </div>
    <div>
      <div className={`h-6 w-34 rounded-md ${backgroundColor} text-white text-center font-medium shadow-md`}>
        {label}
      </div>
    </div>
  </motion.div>
);

const DoYouKnow: React.FC<DoYouKnowSectionProps> = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div className="px-6 mt-12 bg-primary" ref={ref}>
      <motion.div
        className="text-center"
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.h1
          className="text-6xl font-semibold text-secondary drop-shadow-2xl"
          variants={fadeIn('up', 'spring', 0.2, 1)}
        >
          <span className="drop-shadow-2xl border-b-6 border-secondary p-2">{data?.content3}</span>
        </motion.h1>
      </motion.div>

      <div className="flex w-full mt-12">
        {/* Left Section */}
        <div className="w-1/2 flex min-h-screen items-center justify-center bg-gray-50 px-16">
          <motion.div
            className="relative w-full max-w-lg"
            variants={staggerContainer(0.2, 0.3)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.div
              className="absolute -left-4 top-0 h-96 w-96 rounded-full bg-purple-300 blur-2xl filter"
              variants={fadeIn('left', 'spring', 0.4, 1)}
            />
            <motion.div
              className="absolute right-4 top-0 h-96 w-80 rounded-full bg-yellow-300 blur-2xl filter"
              variants={fadeIn('right', 'spring', 0.6, 1)}
            />
            <motion.div
              className="absolute -bottom-32 left-24 h-96 w-96 rounded-full bg-pink-300 blur-2xl filter"
              variants={fadeIn('up', 'spring', 0.8, 1)}
            />
            <motion.div className="relative m-2 space-y-4">
              {/* Content Cards */}
              <ContentCard label="Track Expenses" value={data?.content31} backgroundColor="bg-purple-400" />
              <ContentCard label="Investment" value={data?.content32} backgroundColor="bg-yellow-400" />
              <ContentCard label="Investment" value={data?.content33} backgroundColor="bg-pink-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-1/2 flex justify-center items-center">
          <motion.img
            src={`/${data.content3ImagePath}`}
            alt="camp"
            className="w-[1000px] h-[550px] object-contain"
            variants={fadeIn('right', 'spring', 1, 1)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          />
        </div>
      </div>
    </div>
  );
};

export default DoYouKnow;
