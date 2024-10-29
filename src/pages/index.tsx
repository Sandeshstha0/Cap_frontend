import Layout from "@/Components/globalComponent/Landingpage/MainLayout";

import DoYouKnow from "@/Components/PageComponent/Landingpage/Home/DoYouKnow";
import HeroSection from "@/Components/PageComponent/Landingpage/Home/HeroSection";
import Posts from "@/Components/PageComponent/Landingpage/Home/Posts";
import SecondSection from "@/Components/PageComponent/Landingpage/Home/SecondSection";
import ParticlesComponent from "@/Components/ParticlesComponent ";
export default function Home() {
  return (
    <>
   <div className="overflow-x-hidden">
    <Layout> 
        {/* ParticlesComponent outside the bg-primary div */}
        <ParticlesComponent id="tsparticles" />

        <div className=" overflow-y-hidden overflow-x-hidden  relative z-10">
          <HeroSection />
          <div className="bg-primary">
            <SecondSection />
            <DoYouKnow />
            <Posts />
          </div>
        </div>
      </Layout>

    </div>
    
    </>
  );
}
