import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import useFetchProtectedData from "@/hooks/useFetchProtectedData";
import axios from 'axios';

interface BudgetExpert {
  id: number;
  firstName: string;
  secondName: string;
  description: string;
  content2: string;
  content21: string;
  content3: string;
  content31: string;
  content32: string;
  content33: string;
  aboutUs: string;
  aboutUsDescription: string;
  link1: string;
  link2: string;
  link3: string;
  link4: string;
  mail: string;
  phoneNumber: string;
  logoPath: string | null;
  mainImagePath: string | null;
  content3ImagePath: string;
  aboutUsImagePath: string;
  user: any | null;
}

export default function Footer() {
  const [protectedData, setProtectedData] = React.useState<BudgetExpert | null>(null);
   const [apiError, setApiError] = React.useState<string | null>(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BudgetExpert>('http://localhost:8080/api/v1/contents/1');
        setProtectedData(response.data);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };

    fetchData();
  }, []);
  return (
    <footer className="px-2 py-10 md:px-6 bg-boxdark">
      <div className="container mx-auto max-w-[1250px]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between border-b-4 pb-6 border-cyan-900">
          {/* Logo Section */}
          <div className="flex items-center justify-center md:items-start md:mt-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-[100px] h-auto"
            />
          </div>

          {/* Pages Section */}
          <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:space-x-3">
            <div className="p-2 flex flex-col items-center md:items-start text-white">
              <p className="mb-4 text-center md:text-left font-semibold">Pages</p>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <Link href="/jobs">Blogs</Link>
                <Link href="/about">About us</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:space-x-3">
            <div className="p-2 flex flex-col items-center md:items-start text-white">
              <p className="mb-4 text-center md:text-left font-semibold">Contact Us</p>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <p>Phone: {protectedData?.phoneNumber || "N/A"}</p>
                <p>Email: {protectedData?.mail || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:space-x-3">
            <div className="p-2 flex flex-col items-center md:items-start text-white">
              <p className="mb-4 text-center md:text-left font-semibold">Social</p>
              <div className="flex space-x-3">
                <Link href="https://www.facebook.com" passHref legacyBehavior>
                  <a><FaFacebook className="text-xl hover:text-blue-600 transition-colors" /></a>
                </Link>
                <Link href="https://www.instagram.com" passHref legacyBehavior>
                  <a><FaInstagram className="text-xl hover:text-pink-500 transition-colors" /></a>
                </Link>
                <Link href="https://www.twitter.com" passHref legacyBehavior>
                  <a><FaTwitter className="text-xl hover:text-blue-400 transition-colors" /></a>
                </Link>
                <Link href="https://www.youtube.com" passHref legacyBehavior>
                  <a><FaYoutube className="text-xl hover:text-red-600 transition-colors" /></a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <p className="text-center text-white mt-8">
          &copy; {new Date().getFullYear()} {protectedData?.firstName || "N/A"} {protectedData?.secondName || "N/A"}  | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
