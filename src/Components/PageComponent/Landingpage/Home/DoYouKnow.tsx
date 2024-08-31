/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

export default function DoYouKnow() {
    return (
        <><div className='px-6 mt-12 bg-primary' >


            <div className='text-center  '>
                <h1 className="text-6xl font-semibold text-secondary drop-shadow-2xl">
                    <span className="drop-shadow-2xl border-b-6 border-secondary p-2">Do you know?</span>
                </h1>

            </div>
            <div className='flex w-full'>
                <div className="w-1/2 flex min-h-screen items-center justify-center bg-gray-50 px-16">
                    <div className="relative w-full max-w-lg">
                        <div className="animation-delay-4000 absolute -left-4 top-0 h-96 w-96 animate-blob rounded-full bg-purple-300  blur-2xl filter"></div>
                        <div className="animation-delay-2000 absolute right-4 top-0 h-96 w-80 animate-blob rounded-full bg-yellow-300 blur-2xl filter"></div>
                        <div className="animation-delay-1000 absolute -bottom-32 left-24 h-96 w-96 animate-blob rounded-full bg-pink-300 mix-blend-multiply blur-2xl filter"></div>
                        <div className="relative m-2 space-y-4">
                            <div className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4 shadow-lg">
                                <div className="flex-1">
                                    <div className="h-8 p-2  rounded-md bg-slate-200 text-black font-semibold text-sm">Regularly monitor  your money </div>
                                </div>
                                <div>
                                    <div className="h-6 w-34 rounded-md bg-purple-400 text-white text-center font-medium shadow-md">Track Expenses</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-4">
                                <div className="flex-1">
                                    <div className="h-8 p-2  rounded-md bg-slate-200 text-black font-semibold  text-sm ">Rather then saving invest it !! </div>
                                </div>
                                <div>
                                    <div className="h-6 w-34 rounded-lg bg-yellow-400 text-white text-center font-medium shadow-md"> Investment</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-4">
                                <div className="flex-1">
                                    <div className="h-8 p-2  rounded-md bg-slate-200 text-black  font-semibold text-sm ">Rather then saving invest it !! </div>
                                </div>
                                <div>
                                    <div className="h-6 w-34 rounded-lg bg-pink-400 text-white text-center font-medium shadow-md"> Investment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <img
                        src="/55.png"
                        alt="camp"
                        className="w-[1000px] h-[550px] object-contain"
                    />
                </div>


            </div>
        </div>
        </>
    )
}
