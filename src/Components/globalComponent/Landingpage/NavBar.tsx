import Image from 'next/image';
import React from 'react';

function Navbar() {
  return (
    <div className=" px-4 bg-primary">
      <div className="bg-primary  flex items-center justify-between  px-6 py-2 rounded-lg shadow-xl w-full">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="Logo"
            className="rounded-full"
          />
        </div>

        <div className="flex items-center space-x-8">
          {/* Navigation Links Section */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-[#facc15]  hover:border-b-2 font-normal transition duration-200">
              Home
            </a>
            <a href="#" className="text-white hover:text-[#facc15]  hover:border-b-2 font-normal transition duration-200">
             Post
            </a>
            <a href="#" className="text-white hover:text-[#facc15]  hover:border-b-2 font-normal transition duration-200">
              Aboutus
            </a>
            <a href="#" className="text-white hover:text-[#facc15]  hover:border-b-2 font-normal transition duration-200">
              Contact
            </a>
          </div>

          {/* Button Section */}
          <button className="bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-full px-6 py-2 transition duration-300">
            Login
          </button>
          
          
        </div>
      </div>
    </div>
    
  );
}

export default Navbar;
