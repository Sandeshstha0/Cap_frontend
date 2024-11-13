
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeIn, staggerContainer } from "@/utils/motion";

export default function DoYouKnow() {
    // Create a ref to track the section
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 }); // amount: 0.2 triggers when 20% of the component is visible

    return (
        <div className="px-6 mt-12 bg-primary" ref={ref}>
            <motion.div
                className="text-center"
                variants={staggerContainer(0.2, 0.1)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                <motion.h1
                    className="text-6xl font-semibold text-secondary drop-shadow-2xl"
                    variants={fadeIn('up', 'spring', 0.2, 1)}
                >
                    <span className="drop-shadow-2xl border-b-6 border-secondary p-2">Do you know?</span>
                </motion.h1>
            </motion.div>
            
            <div className="flex w-full mt-12">
                <div className="w-1/2 flex min-h-screen items-center justify-center bg-gray-50 px-16">
                    <motion.div
                        className="relative w-full max-w-lg"
                        variants={staggerContainer(0.2, 0.3)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        <motion.div
                            className="absolute -left-4 top-0 h-96 w-96 rounded-full bg-purple-300 blur-2xl filter"
                            variants={fadeIn('left', 'spring', 0.4, 1)}
                        />
                        <motion.div
                            className="absolute right-4 top-0 h-96 w-80 rounded-full bg-yellow-300 blur-2xl filter"
                            variants={fadeIn('right', 'spring', 0.6, 1)}
                        />
                        <motion.div
                            className="absolute -bottom-32 left-24 h-96 w-96 rounded-full bg-pink-300 blur-2xl filter"
                            variants={fadeIn('up', 'spring', 0.8, 1)}
                        />
                        <motion.div className="relative m-2 space-y-4">
                            <motion.div
                                className="flex items-center justify-between space-x-2 rounded-lg bg-white p-4 shadow-lg"
                                variants={fadeIn('up', 'spring', 0.4, 1)}
                            >
                                <div className="flex-1">
                                    <div className="h-8 p-2 rounded-md bg-slate-200 text-black font-semibold text-sm">
                                        Regularly monitor your money
                                    </div>
                                </div>
                                <div>
                                    <div className="h-6 w-34 rounded-md bg-purple-400 text-white text-center font-medium shadow-md">
                                        Track Expenses
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-between space-x-8 rounded-lg bg-white p-4"
                                variants={fadeIn('up', 'spring', 0.6, 1)}
                            >
                                <div className="flex-1">
                                    <div className="h-8 p-2 rounded-md bg-slate-200 text-black font-semibold text-sm">
                                        Rather than saving, invest it!!
                                    </div>
                                </div>
                                <div>
                                    <div className="h-6 w-34 rounded-lg bg-yellow-400 text-white text-center font-medium shadow-md">
                                        Investment
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-between space-x-8 rounded-lg bg-white p-4"
                                variants={fadeIn('up', 'spring', 0.8, 1)}
                            >
                                <div className="flex-1">
                                    <div className="h-8 p-2 rounded-md bg-slate-200 text-black font-semibold text-sm">
                                        Invest in growth!
                                    </div>
                                </div>
                                <div>
                                    <div className="h-6 w-34 rounded-lg bg-pink-400 text-white text-center font-medium shadow-md">
                                        Investment
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <motion.img
                        src="/55.png"
                        alt="camp"
                        className="w-[1000px] h-[550px] object-contain"
                        variants={fadeIn('right', 'spring', 1, 1)}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    />
                </div>
            </div>
        </div>
    );
}
