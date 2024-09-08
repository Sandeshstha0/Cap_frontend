import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import React, { Component } from 'react';

export class Index extends Component {
  render() {
    return (
      <Layout>
        {/* Main Container */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-star bg-white t mx-10 mt-10 md:mx-2000">
          
          {/* Contact Form Section */}
          <div className="w-100 md:w-1/2 mb-10 md:mb-0">
            <h2 className='text-3xl font-semibold text-primary text-center mt-6'>
              Contact us
            </h2>

            {/* Form */}
            <div className="space-y-4">
              {/* Name Input */}
              <div className="flex items-center space-x-15 text">
                <span className="material-icons text-4xl"></span>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-100 p-4 rounded-full bg-teal-500 text-white"
                />
              </div>

              {/* Email Input */}
              <div className="flex items-center space-x-15 ">
                <span className="material-icons text-4xl"></span>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-100 p-4 rounded-full bg-teal-500  text-white"
                />
              </div>
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-15 py-4">
                <span className="material-icons text-4xl"></span>
                <textarea
                  placeholder="Message"
                  className="w-100  p-4 rounded-full bg-teal-500 text-white"
                  rows={4}
                ></textarea>
              </div>

              {/* Send Message Button */}
              <div className="flex items-center space-x-4">
          <button className="bg-primary text-gray-900 font-medium rounded-full px-6 py-2  text-white transition duration-300">
          
                Send Message
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-100 md:w-1/2 flex justify-center">
            <img
              src="/contactus.png"
              className="rounded-lg w-100max-w-md h-auto"
              alt="Contact Us"
              
            />
          
          <div className="w-100 md:w-1/2 flex justify-center ">
            <img
              src="/chat.png"
              className="rounded-lg w-50 max-w-md h-auto"
              alt="Contact Us"
              
            />
            </div>
            </div>
            </div>
      </Layout>
    );
  }
}

export default Index;
