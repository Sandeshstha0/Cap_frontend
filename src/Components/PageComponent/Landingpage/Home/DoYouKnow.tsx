/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

export default function DoYouKnow() {
    return (
        <><div >


            <div className='text-center  mt-21'>
                <h1 className='text-6xl font-semibold text-secondary'>Do you know?</h1>
            </div>
            <div className='flex w-full'>
                <div className="w-1/2 flex min-h-screen items-center justify-center bg-gray-50 px-16">
                    <div className="relative w-full max-w-lg">
                        <div className="animation-delay-4000 absolute -left-4 top-0 h-96 w-96 animate-blob rounded-full bg-purple-300 mix-blend-multiply blur-2xl filter"></div>
                        <div className="animation-delay-2000 absolute right-4 top-0 h-96 w-80 animate-blob rounded-full bg-yellow-300 mix-blend-multiply blur-2xl filter"></div>
                        <div className="animation-delay-1000 absolute -bottom-32 left-24 h-96 w-96 animate-blob rounded-full bg-pink-300 mix-blend-multiply blur-2xl filter"></div>
                        <div className="relative m-12 space-y-4">
                            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-5">
                                <div className="flex-1">
                                    <div className="h-4 w-48 rounded bg-slate-200"></div>
                                </div>
                                <div>
                                    <div className="h-6 w-24 rounded-lg bg-purple-300"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-5">
                                <div className="flex-1">
                                    <div className="h-4 w-64 rounded bg-slate-200"></div>
                                </div>
                                <div>
                                    <div className="h-6 w-24 rounded-lg bg-yellow-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <img
                        src="/sac.png"
                        alt="camp"
                        className="w-[1000px] h-[400px] object-contain"
                    />
                </div>


            </div>
        </div>
        </>
    )
}
