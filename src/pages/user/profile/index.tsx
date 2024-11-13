import UserLayout from '@/Components/globalComponent/User/Layouts/UserLayout'
import Profile from '@/Components/PageComponent/UserPage/Profile/Profile'
import UserPost from '@/Components/PageComponent/UserPage/Profile/UserPost'
import React from 'react'

export default function index() {
  return (

    <UserLayout> 
    <Profile/> 
    <UserPost/>
    </UserLayout>
  )
}
