import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section
    
      className="px-2 py-10 md:px-6 bg-boxdark"
    >
      <div className="container mx-auto max-w-[1250px]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between border-b-4 pb-6 border-cyan-900  ">

          <div className="flex items-center justify-center md:items-start md:mt-2">
            <Image
              src="/logo.png"
              alt="logo"
              style={{ backgroundColor: "#20364B" }}
              width={100}
              height={100}
              className="w-[100px] h-auto"
            />
          </div>

          <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:space-x-3">
            <div className="p-2 flex flex-col items-center md:items-start text-white">
              <p className="mb-4 text-center md:text-left">Pages</p>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <Link href="/jobs">Blogs</Link>
                <Link href="/about">About us</Link>
                <Link href="/contact">Contact us</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>

          

          <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:space-x-3">
            <div className="p-2 flex flex-col items-center md:items-start text-white">
              <p className="mb-4 text-center md:text-left">Contact Us</p>
              <div className="flex flex-col items-center md:items-start space-y-3">
                <p>Phone number: 9819129372</p>
                <p>Mail: Contact@budgetexpert.com</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:space-x-3">
            <div className="p-2 flex flex-col items-center md:items-start text-white">
              <p className="mb-4 text-center md:text-left">Social</p>
              <div className="flex space-x-3">
                <FaFacebook className="text-xl" />
                <FaInstagram className="text-xl" />
                <FaTwitter className="text-xl" />
                <FaYoutube className="text-xl" />
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-white mt-8">
          {" "}
          &copy; 2024 Budget Expert | All Rights Reserved{" "}
        </p>

      </div>

    </section>
  );
}
