import Image from "next/image";
import React from "react";

export default function TotalBudget() {
  return (
    <div>
      <div className="bg-white rounded-lg text-center mt-10 py-10">
        <div className="container rounded-md flex flex-col items-center gap-4">
          <div
            className="font-bold text-6xl sm:text-8xl mt-6"
            style={{ color: "rgb(0, 114, 150)" }}
          >
            85000
          </div>
          <p className="font-bold text-xl sm:text-2xl">Your current Budget</p>
        </div>
     

        <div className="flex flex-col md:flex-row justify-between md:space-x-12 space-y-6 md:space-y-0 px-4 md:px-12 mt-10">
          {/* Card 1: Total Income */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-full md:w-1/3 h-24 rounded-lg flex space-x-7 justify-center items-center shadow-lg">
            <Image
              src="/22.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[70px] h-auto"
            />
            <div>
              <div className="text-white text-2xl font-bold">70,000</div>
              <div className="text-white text-sm">Total income this month</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-r from-blue-400 to-teal-400 w-full md:w-1/3 h-24 rounded-lg flex space-x-7 justify-center items-center shadow-lg">
            <Image
              src="/22.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[70px] h-auto"
            />
            <div>
              <div className="text-white text-2xl font-bold">40,000</div>
              <div className="text-white text-sm">Total income this month</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-r from-green-300 to-lime-300 w-full md:w-1/3 h-24 rounded-lg flex space-x-7 justify-center items-center shadow-lg">
            <Image
              src="/22.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[70px] h-auto"
            />
            <div>
              <div className="text-white text-2xl font-bold">15,000</div>
              <div className="text-white text-sm">Total income this month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
