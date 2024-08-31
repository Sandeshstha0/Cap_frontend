import React from 'react'

export default function SecondSection() {
    return (
        <section className="max-container text-white bg-primary padding-container px-6 flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
            <div className='flex w-full'>
                <div className='w-1/2 text-center font-bold text-6xl '>
                    <h1 className='text-secondary'>A Guide to</h1>
                    <h2>Proper Future</h2>
                </div>
                <div className="flex w-full  items-center justify-center xl:w-2/3">
                    <p className="text-lg leading-relaxed lg:text-base xl:text-lg">
                        We want to be a part of your journey, helping you discover the
                        incorruptible beauty of nature. Let us guide you on an adventure
                        around the world, all through a single app.
                    </p>
                </div>

            </div>
        </section>
       
    )
}