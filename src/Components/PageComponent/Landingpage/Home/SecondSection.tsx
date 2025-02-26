import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideInVariants, slideIn } from "@/utils/motion";

interface SectionSectionProps {
  data: any;
}

const SectionText: React.FC<{ text: string, className?: string }> = ({ text, className }) => (
  <motion.div className={`w-full ${className || ""}`}>
    <p className="text-lg leading-relaxed lg:text-base xl:text-lg">
      {text}
    </p>
  </motion.div>
);

const SecondSection: React.FC<SectionSectionProps> = ({ data }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      className="max-container text-white bg-primary padding-container px-6 flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row"
      initial="hidden"
      animate={controls}
      variants={slideInVariants}
    >
      <motion.div className="flex w-full" variants={slideIn('left', 'spring', 0.6, 1)}>
        <div className="text-center font-bold text-6xl">
          <h1 className="text-secondary">{data?.content2}</h1>
        </div>
      </motion.div>
      
      <SectionText text={data?.content21} className="flex w-full items-center justify-center" />
    </motion.section>
  );
};

export default SecondSection;
