import { TitleText, TypingText } from "@/Components/CustomTexts";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideInVariants, slideIn } from "@/utils/motion";

export default function SecondSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // animate only once
    threshold: 0.1, // triggers when 10% of the section is visible
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden"); // Reset to hidden when out of view
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
        <div className=" text-center font-bold text-6xl">
          <h1 className="text-secondary">A Guide to</h1>
          <h2>Proper Future</h2>
        </div>
      </motion.div>
      <motion.div className="flex w-full" variants={slideInVariants}>
        <div className="flex w-full items-center justify-center">
          <p className="text-lg leading-relaxed lg:text-base xl:text-lg">
            We want to be a part of your journey, helping you discover the
            incorruptible beauty of nature. Let us guide you on an adventure
            around the world, all through a single app.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
