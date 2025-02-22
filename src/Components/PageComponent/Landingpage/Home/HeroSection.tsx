import Button from "@/Components/Button";
import AlternatingStars from "@/Components/RandomStars";
import Typed from "typed.js";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { motion, useInView } from "framer-motion";
import {
  navVariants,
  slideIn,
  fadeIn,
  textVariant,
  zoomIn,
} from "@/utils/motion";
import ParticlesComponent from "@/Components/ParticlesComponent ";

interface HeroSectionProps {
  data: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  // Initialize typing effect
  useEffect(() => {
    const options = {
      strings: [data?.secondName || "Exper"],
      typeSpeed: 300,
      backSpeed: 300,
      backDelay: 500,
      loop: true,
    };
    const typed = new Typed(".typing-text", options);

    return () => {
      typed.destroy();
    };
  }, [data?.secondName]);

  // Refs for sections in view
  const heroMapRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);

  // View tracking
  const isHeroMapInView = useInView(heroMapRef, { once: false, amount: 0.25 });
  const isHeroTextInView = useInView(heroTextRef, {
    once: false,
    amount: 0.25,
  });

  // Render Hero Text Section
  const renderHeroText = () => (
    <motion.div
      className="relative z-20 flex flex-1 flex-col xl:w-1/2"
      ref={heroTextRef}
      variants={navVariants}
      initial="hidden"
      animate={isHeroTextInView ? "show" : "hidden"}
    >
      <motion.div variants={zoomIn(0.3, 1)}>
        <Image
          src="/22.png"
          alt="camp"
          width={70}
          height={70}
          className="absolute left-[-1px] top-[-35px] w-10 lg:w-[50px]"
        />
      </motion.div>

      <motion.h1
        className="font-bold text-5xl md:text-6xl lg:text-8xl text-secondary tracking-wide leading-tight"
        variants={textVariant(0.2)}
      >
        {data?.firstName}
      </motion.h1>

      <motion.h1
        className="font-bold text-5xl md:text-6xl lg:text-8xl tracking-wide leading-tight ml-24"
        variants={textVariant(0.3)}
      >
        <span className="typing-text"></span>
      </motion.h1>

      <motion.p
        className="regular-16 mt-6 text-sm xl:max-w-[550px]"
        variants={fadeIn("up", "tween", 0.4, 1)}
      >
        {data?.description}
      </motion.p>

      <motion.div
        className="my-11 flex flex-wrap gap-5"
        variants={fadeIn("up", "tween", 0.5, 1)}
      >
        <AlternatingStars />
      </motion.div>

      <motion.div
        className="flex flex-col w-full gap-3 sm:flex-row"
        variants={slideIn("up", "spring", 0.6, 1)}
      >
        <Button label="Get Started" onClick={handleClick} variant="primary" />
      </motion.div>
    </motion.div>
  );

  // Render Hero Image Section
  const renderHeroImage = () => (
    <motion.div
      className="relative flex flex-1 items-start"
      variants={slideIn("right", "spring", 0.7, 1)}
      initial="hidden"
      animate={isHeroMapInView ? "show" : "hidden"}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        scale={1.05}
        transitionSpeed={250}
      >
        <motion.div
          className="relative flex w-[600px] flex-col gap-8 justify-center rounded-3xl px-7"
          viewport={{ once: false, amount: 0.25 }}
          variants={slideIn("right", "spring", 0.8, 1)}
        >
          <Image
            src="/hero.png"
            alt="close"
            width={1000}
            height={500}
            unoptimized={true}
            className="shadow-b-lg"
          />
        </motion.div>
      </Tilt>
    </motion.div>
  );

  return (
    <section className="max-container text-white padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <ParticlesComponent />
      <motion.div
        className="hero-map"
        ref={heroMapRef}
        variants={fadeIn("up", "spring", 0.2, 1)}
        initial="hidden"
        animate={isHeroMapInView ? "show" : "hidden"}
      />
      {renderHeroText()}
      {renderHeroImage()}
    </section>
  );
};

export default HeroSection;
