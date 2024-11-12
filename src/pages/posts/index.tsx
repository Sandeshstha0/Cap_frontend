/* eslint-disable @next/next/no-img-element */
import Layout from '@/Components/globalComponent/Landingpage/MainLayout'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosPerson } from "react-icons/io";
import { PostData } from '@/Data/Data';
import Button from '@/Components/Button';
import Link from 'next/link';
import PostComp from '@/Components/PageComponent/Landingpage/Post/PostComp';
import PracPost from '@/Components/PageComponent/Landingpage/Post/PracPOst';

export default function index() {

 
  return (
    <Layout>

    <PostComp/>
    {/* <PracPost/> */}


    </Layout>


  )
}
