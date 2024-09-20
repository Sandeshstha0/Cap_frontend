/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout';
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import DeleteModal from '@/Components/PageComponent/Adminpage/DeleteModal';
import { UserData } from '@/Data/UserData';
import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserDescription = () => {
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    // Log id to verify it's being read correctly
    console.log('ID:', id);

    // Find the post based on the id (ensure id is a number)
    const user = UserData.find((p) => p.id === parseInt(id as string));

    if (!user) {
        return <p className="text-center text-xl font-semibold mt-10">user not found</p>;
    }
    const handleClick = () => {

    };
    // Open delete modal and pass post ID
    const openDeleteModal = (id: any) => {
        setSelectedPostId(id);
        setDeleteModalState(true);
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto px-4 text-primary ">
                <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            {/* User Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src={"/admin.png"}
                                    alt="User Avatar"
                                />
                            </div>

                            {/* User Info */}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {user.firstname} {user.lastName}
                                </h1>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="mt-12">
                            <h2 className="text-lg font-semibold text-gray-800">User Details</h2>
                            <ul className="mt-2 space-y-2 flex justify-around">
                                <div className='space-y-2'>
                                    <li className=" text-gray-600">

                                        <strong>First Name:</strong> {user.firstname}
                                    </li>
                                    <li className=" text-gray-600">
                                        <strong>Last Name:</strong> {user.lastName}
                                    </li>

                                </div>
                                <div className='space-y-2'>
                                    <li className=" text-gray-600">
                                        <strong>ID:</strong> {user.id}
                                    </li>
                                    <li className=" text-gray-600">
                                        <strong>Email:</strong> {user.email}
                                    </li>

                                </div>


                            </ul>
                        </div>

                        <div className='py-6'>
                            <h1 className='text-2xl font-semibold'>User Posts</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {user?.posts.map((item, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col">
                                    <div className="rounded-lg cursor-pointer bg-white flex flex-col flex-1">
                                        {/* Image Section */}
                                        <div className="w-full h-40 overflow-hidden mb-4 rounded-t-lg">
                                            <Image
                                                src={item.image}
                                                alt="Post Image"
                                                width={600}
                                                height={1000}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-2 text-left flex-1">
                                            <p className="text-xs md:text-sm text-gray-500 mb-2">{item.time}</p>
                                            <h2 className="font-semibold text-lg md:text-xl text-gray-800 mb-3">{item.title}</h2>

                                            <div
                                                className="text-sm text-gray-600 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.description.length > 50
                                                        ? `${item.description.substring(0, 50)}...`
                                                        : item.description,
                                                }}
                                            />
                                        </div>

                                        {/* Action Button at Bottom Right */}
                                        <div className="text-right mt-auto">
                                        <Button label="Delete" onClick={() => openDeleteModal(item.id)} variant="primary" />
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>
                    {/* Delete Modal */}
                    {deleteModalState && (
                        <DeleteModal
                            isOpen={deleteModalState}
                            closeModal={() => setDeleteModalState(false)}

                        />
                    )}

                </div>
            </div>

        </DefaultLayout>
    );
};

export default UserDescription;
