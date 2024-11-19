/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import DefaultLayout from '@/Components/globalComponent/Admin/Layouts/DefaultLayout';
import DeleteModal from '@/Components/PageComponent/Adminpage/DeleteModal';
import { getPost } from '@/service/landingService';
import { deleteUserPost } from '@/service/userService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  image: string;
  slug: string;
  content: string;
  author: {
    firstname: string;
    secondname: string;
  };
  imageType:string;
  imageData:string
}

const AdminPostDescription = () => {
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { slug } = router.query;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        const posts = data?.data || [];
        if (slug) {
          const foundPost = posts.find((p: Post) => p.slug === slug);
          setPost(foundPost || null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching posts.');
      }
    };

    if (slug) fetchPosts();
  }, [slug]);

  const deletePost = async () => {
    if (!selectedPostId) return;
    try {
      await deleteUserPost(selectedPostId); // Call the delete API with the selected post ID
      setPost(null); // Reset the post to null
      setDeleteModalState(false); // Close the modal
      setSelectedPostId(null); // Reset the selected post ID
      router.push('/admin/managepost'); // Redirect to the posts list after deletion
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete the post');
    }
  };

  if (error) {
    return <p className="text-center text-red-500 text-xl font-semibold mt-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-center text-xl font-semibold mt-10">Post not found</p>;
  }

  const openDeleteModal = (id: string) => {
    setSelectedPostId(id);
    setDeleteModalState(true);
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 bg-white shadow-md">
        {/* Post content */}
        <div className="rounded-lg overflow-hidden">
          <img   src={`data:${post.imageType};base64,${post.imageData}`} alt={post.title} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              {new Date(post.createdAt).toLocaleDateString()} &middot; By{' '}
              <span className="font-medium text-gray-700">
                {post.author.firstname} {post.author.secondname}
              </span>
            </p>
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-right mt-4">
          <Button label="Delete" onClick={() => openDeleteModal(post.id)} variant="primary" />
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModalState && (
        <DeleteModal
          isOpen={deleteModalState}
          closeModal={() => setDeleteModalState(false)}
          deletePost={deletePost}
        />
      )}
    </DefaultLayout>
  );
};

export default AdminPostDescription;
