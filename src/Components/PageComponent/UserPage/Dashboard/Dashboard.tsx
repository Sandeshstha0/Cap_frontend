import Image from "next/image";
import React from "react";

export default function UserDashboard() {
  return (
    <div>
      <div>
        {/* Page Heading */}
        <div className="bg-white text-left text-primary font-normal  px-15 py-6 ">
          <b>Hello, Sachina!</b>
          <p>
            Welcome to the Budget Expert, here we manage you daily Expense and
            Projects
          </p>
        </div>
      </div>
      <div>
        <div className="bg-white text-center mt-10 py-10">
          {/* Main Budget */}
          <div className="text-5xl font-bold text-gray-800">25000</div>
          <div className="text-xl text-gray-600 mt-2">Your current Budget</div>

          <div className="flex justify-between space-x-12 px-12 mt-30">
            {/* Card 1: Total Income */}

            <div className="bg-pink-500 w-full h-24 rounded-lg flex space-x-7 justify-center items-center shadow-lg">
              <Image
                src="/22.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[70px] h-auto"
              />
              <div>
                <div className="text-white text-2xl font-bold">7000</div>
                <div className="text-white text-sm">
                  Total income this month
                </div>
              </div>
            </div>

            <div className="bg-blue-400 w-full h-24 rounded-lg flex space-x-7 justify-center items-center shadow-lg">
              <Image
                src="/22.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[70px] h-auto"
              />
              <div>
                <div className="text-white text-2xl font-bold">70</div>
                <div className="text-white text-sm">
                  Total income this month
                </div>
              </div>
            </div>

            <div className="bg-green-300 w-full h-24 rounded-lg flex space-x-7 justify-center items-center shadow-lg">
              <Image
                src="/22.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[70px] h-auto"
              />
              <div>
                <div className="text-white text-2xl font-bold">15000</div>
                <div className="text-white text-sm">
                  Total income this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
