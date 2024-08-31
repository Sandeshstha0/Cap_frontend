import DoYouKnow from "@/Components/PageComponent/Landingpage/Home/DoYouKnow";
import HeroSection from "@/Components/PageComponent/Landingpage/Home/HeroSection";
import SecondSection from "@/Components/PageComponent/Landingpage/Home/SecondSection";

export default function Home() {

  return (
    <>
      <div className=" bg-primary overflow-y-hidden">
        <HeroSection />
        <SecondSection />
        <DoYouKnow />
      </div>

    </>
  );
}
