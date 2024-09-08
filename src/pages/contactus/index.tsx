/* eslint-disable @next/next/no-img-element */
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';

export default function index() {
  return (
    <Layout>
      {/* Main Container */}
      <div className="flex flex-col mt-16 md:flex-row justify-between items-center bg-white px-6 md:px-16 py-10 gap-8">
        
        {/* Contact Form Section */}
        <div className="w-full md:w-2/5">
          <h2 className='text-4xl font-bold text-black  text-center mb-8'>
            Contact Us
          </h2>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Input */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-full bg-[#86C2C6] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-full bg-[#86C2C6] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-4">
              <textarea
                placeholder="Your Message"
                className="w-full p-4 rounded-lg bg-[#86C2C6] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
                rows={5}
              ></textarea>
            </div>

            {/* Send Message Button */}
            <div className="text-center">
              <button className="bg-primary text-xl w-full placeholder-white text-white font-semibold rounded-full px-8 py-3 transition duration-300  focus:outline-none focus:ring-4 focus:ring-blue-300">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-8">
          <img
            src="/16.png"
            className="rounded-lg w-full max-w-md h-auto "
            alt="Contact Us"
          />
        
        </div>
      </div>
    </Layout>
  );
}
