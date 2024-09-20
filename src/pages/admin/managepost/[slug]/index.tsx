/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout';
import DeleteModal from '@/Components/PageComponent/Adminpage/DeleteModal';
import { PostData } from '@/Data/Data';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminPostDescription = () => {
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const router = useRouter();
    const { slug } = router.query;

    // Log slug to verify it's being read correctly
    console.log('Slug:', slug);

    // Find the post based on the slug
    const post = PostData.find((p) => p.slug === slug);

    if (!post) {
        return <p className="text-center text-xl font-semibold mt-10">Post not found</p>;
    }

    // Open delete modal and pass post ID
    const openDeleteModal = (id: any) => {
        setSelectedPostId(id);
        setDeleteModalState(true);
    };


    const handleClick = () => {

    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4  bg-white shadow-md ">


                {/* First column: Post content */}
                <div className=" overflow-y-scroll rounded-lg no-scrollbar  overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="p-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                        <p className="text-sm text-gray-500 mb-6">
                            {post.time} &middot; By <span className="font-medium text-gray-700">{post.author}</span>
                        </p>
                        <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.description }} />
                    </div>
                </div>

                <div className="text-right mt-auto space-x-2">

                    <Button label="Delete" onClick={() => openDeleteModal(post.id)} variant="primary" />
                </div>

            </div>
            {/* Delete Modal */}
            {deleteModalState && (
                <DeleteModal
                    isOpen={deleteModalState}
                    closeModal={() => setDeleteModalState(false)}

                />
            )}

        </DefaultLayout>
    );
};

export default AdminPostDescription;
