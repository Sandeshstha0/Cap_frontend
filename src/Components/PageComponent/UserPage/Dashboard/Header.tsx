import React from 'react'

export default function Header() {
  return (
    <div className="bg-white rounded-lg">
      {/* Page Heading */}
      <div className="text-left text-primary font-normal px-4 py-6 md:px-10 md:py-8 lg:px-16 lg:py-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
          Hello, Sachina!
        </h1>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          Welcome to the Budget Expert, where we help you manage your daily
          expenses and projects.
        </p>
      </div>
    </div>
  )
}
