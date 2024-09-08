/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { SlGraduation } from 'react-icons/sl';
import { ImNotification } from 'react-icons/im';
import { BsTelephone } from 'react-icons/bs';
import Button from '@/Components/Button';
import { PostData } from '@/Data/Data';

export default function Posts() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <div className='flex justify-between px-24  mt-24' >
                <h1 className='text-5xl font-semibold text-secondary px-6'>Posts</h1>
                <p className='text-secondary font-light hover:cursor-pointer '>See more</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 max-w-screen-lg mx-auto text-center text-white">
                <div className="bg-gray-100 p-6">

                    <div className="shadow-lg bg-white items-center rounded-lg cursor-pointer dark:bg-boxdark dark:text-white transition hover:shadow-xl">
                        {/* Image Section */}
                        <div className="w-full h-52 overflow-hidden mb-4 p-4 pb-0 rounded-t-lg">
                            <Image
                                src="/aboutus.png"
                                alt="Budget Categories Image"
                                width={600}
                                height={1000}
                                className="w-full h-full object-cover rounded-t-lg"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-6 text-left">
                            <div className="pb-4 border-b border-gray-300 dark:border-gray-600">
                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    September 29, 2024
                                </p>
                                <h2 className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-3">
                                    Budget Categories: Long list or short list
                                </h2>
                            </div>

                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s...
                                </p>
                            </div>

                            {/* Action Buttons */}
                         
                                <div className='text-right mt-6 space-x-4' >
                                    <Button label="Read" onClick={handleClick} variant="primary" />
                                </div>
                           
                        </div>
                    </div>
                </div>




                <div className="bg-gray-200 ">
                    {PostData.map((item, index) =>
                        <div key={index} className='w-full px-2 md:px-2  rounded-lg mt-4 shadow-lg bg-secondary' >
                            <div className='flex flex-col-reverse md:flex-row '>
                                <div className='flex   p-3 '>
                                    {/* <Image src="/aboutus.png" alt='' width={500} height={500} className='rounded-xl' /> */}
                                    <img src='/aboutus.png' className='object-cover w-35  ' alt='Background' />
                                </div>

                                <div className='flex flex-col w-2/3 px-4 py-3.5 text-primary'>
                                    <div className=' border-gray-300 text-left'>
                                        <p className='text-sm md:text-sm font-medium mb-2 md:mb-2'>
                                            {item.time}
                                        </p>
                                        <h1 className='text-xl md:text-lg font-bold mb-2 md:mb-2'>
                                            {item.title}
                                        </h1>
                                        <div className='text-right' >
                                            <Button label="Read" onClick={handleClick} variant="secondary" />
                                        </div>


                                    </div>

                                </div>


                            </div>


                        </div>
                    )}
                </div>



            </div>


        </div>
    )
}
