import NavBar from "@/Components/globalComponent/Landingpage/NavBar";
import DoYouKnow from "@/Components/PageComponent/Landingpage/Home/DoYouKnow";
import HeroSection from "@/Components/PageComponent/Landingpage/Home/HeroSection";
import SecondSection from "@/Components/PageComponent/Landingpage/Home/SecondSection";

export default function Home() {

  return (
    <>
      <div className=" bg-primary overflow-y-hidden">
        <NavBar/>
        <HeroSection />
        <SecondSection />
        <DoYouKnow />
      </div>

    </>
  );
}
