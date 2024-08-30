import Button from '@/Components/Button'
import AlternatingStars from '@/Components/RandomStars'
import Image from 'next/image'
import React from 'react'

function HeroSection() {
    const handleClick = () => {
        alert('Button clicked!');
      };
    return (
        <section className="max-container   padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
            <div className="hero-map" />

            <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
                <Image
                    src="/22.png"
                    alt="camp"
                    width={70}
                    height={70}
                    className="absolute left-[-5px] top-[-35px] w-10 lg:w-[50px]"
                />
                <h1 className="font-bold  lg: text-8xl text-secondary">Budget </h1>
                <h1 className="font-bold text-8xl text-[FDC220] ml-24">Expert</h1>
                <p className="regular-16 mt-6 text-gray-30 text-sm xl:max-w-[450px] ">
                    We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app
                </p>

                <div className="my-11 flex flex-wrap gap-5">
                    <div className="flex items-center gap-2">
                        <AlternatingStars />
                    </div>

                </div>

                <div className="flex flex-col w-full gap-3 sm:flex-row">
                    <Button label="Get Started" onClick={handleClick} variant="primary" />
                </div>
            </div>

            <div className="relative flex flex-1 items-start ">
                <div className="relative  flex w-[600px] flex-col gap-8 justify-center rounded-3xl px-7 ">


                    <Image src="/155.png" alt="close" width={1000} height={24} className='shadow-b-lg' />
                </div> 

            </div>







        </section>
    )
}

export default HeroSection