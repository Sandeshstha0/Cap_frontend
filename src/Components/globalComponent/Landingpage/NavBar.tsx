import Image from 'next/image';
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-primary fixed top-0 left-0 w-full z-50 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Logo"
            className="rounded-full"
          />
          <span className="text-white text-lg font-semibold">BrandName</span>
        </div>

        {/* Navigation Links Section */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-white font-medium hover:text-[#facc15] transition duration-200">
            Home
          </a>
          <a href="#" className="text-white font-medium hover:text-[#facc15] transition duration-200">
            Post
          </a>
          <a href="#" className="text-white font-medium hover:text-[#facc15] transition duration-200">
            About Us
          </a>
          <a href="#" className="text-white font-medium hover:text-[#facc15] transition duration-200">
            Contact
          </a>
        </div>

        {/* Button Section */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#facc15] text-gray-900 font-medium rounded-full px-6 py-2 hover:bg-yellow-500 transition duration-300">
            Login
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
