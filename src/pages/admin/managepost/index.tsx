import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout'
import React from 'react'

export default function index() {
  return (
    <DefaultLayout>
    <div className='bg-white text-left text-primary font-bold px-4 text-2xl lg:px-6 py-6'>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">Blogs</h1>
    </div>
    </div>
    </DefaultLayout>
  )
}
