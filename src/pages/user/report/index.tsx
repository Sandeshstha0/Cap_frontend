import UserLayout from '@/Components/globalComponent/User/Layouts/UserLayout'
import OverView from '@/Components/PageComponent/UserPage/Dashboard/OverView'
import BasicLineChart from '@/Components/PageComponent/UserPage/Report/BasicLineChart'
import BasicPie from '@/Components/PageComponent/UserPage/Report/BasicPie'
import React from 'react'

export default function index() {
  return (
    <UserLayout>
   <OverView/>
   <div className='bg-white'>
   <BasicLineChart/>
   <BasicPie/>

   </div>
  
    </UserLayout>
  )
}
