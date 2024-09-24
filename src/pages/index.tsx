import Layout from "@/Components/globalComponent/Landingpage/MainLayout";

import DoYouKnow from "@/Components/PageComponent/Landingpage/Home/DoYouKnow";
import HeroSection from "@/Components/PageComponent/Landingpage/Home/HeroSection";
import Posts from "@/Components/PageComponent/Landingpage/Home/Posts";
import SecondSection from "@/Components/PageComponent/Landingpage/Home/SecondSection";

export default function Home() {

  return (
    <>
    <Layout>
      <div className=" bg-primary overflow-y-hidden mt-18 " >
       
        <HeroSection />
        <SecondSection />
        <DoYouKnow />
        <Posts/>
      </div>
      </Layout>

    </>
  );
}
