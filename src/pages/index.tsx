import Image from "next/image";
import { Inter } from "next/font/google"

export default function Home() {
  return (
    <section className="max-container bg-primary text-white padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
    <div className="hero-map" />

    <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
      <Image
        src="/camp.svg"
        alt="camp"
        width={50}
        height={50}
        className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
      />
      <h1 className="bold-52 lg:bold-88 text-[FDC220]">Budget </h1>
      <h1 className="bold-52 lg:bold-88 text-[FDC220] ml-24">Expert</h1>
      <p className="regular-16 mt-6 text-gray-30 text-2xl xl:max-w-[600px] ">
        We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app
      </p>

      <div className="my-11 flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          {Array(5).fill(1).map((_, index) => (
            <Image
              src="/star.svg"
              key={index}
              alt="star"
              width={24}
              height={24}
            />
          ))}
        </div>

        <p className="bold-16 lg:bold-20 text-blue-70">
          198k
          <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
        </p>
      </div>

      <div className="flex flex-col w-full gap-3 sm:flex-row">
      
      </div>
    </div>

    <div className="relative flex flex-1 items-start">
      <div className="relative  flex w-[350px] flex-col gap-8 rounded-3xl px-7 ">


        <Image src="/15.png" alt="close" width={600} height={24} />
      </div>

    </div>







  </section>
  );
}
