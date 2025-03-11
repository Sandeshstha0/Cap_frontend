import React from 'react';
import Layout from "@/Components/globalComponent/Landingpage/MainLayout";
import DoYouKnow from "@/Components/PageComponent/Landingpage/Home/DoYouKnow";
import HeroSection from "@/Components/PageComponent/Landingpage/Home/HeroSection";
import Posts from "@/Components/PageComponent/Landingpage/Home/Posts";
import SecondSection from "@/Components/PageComponent/Landingpage/Home/SecondSection";
import ParticlesComponent from "@/Components/ParticlesComponent ";
import { useFetchData } from '@/hooks/Landing/useFetchData';


const LandingPage = () => {
  const { data, error } = useFetchData('http://localhost:8080/api/v1/contents/1');

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-hidden">
      <Layout>
        <ParticlesComponent id="tsparticles" />

        <div className="overflow-y-hidden overflow-x-hidden relative z-10">
          <HeroSection data={data} />
          <div className="bg-primary">
            <SecondSection data={data} />
            <DoYouKnow data={data} />
            <Posts />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LandingPage;
