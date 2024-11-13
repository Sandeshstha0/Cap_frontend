/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import UserLayout from '@/Components/globalComponent/User/Layouts/UserLayout';
import { PostData } from '@/Data/Data';
import { getPost } from '@/service/landingService';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Post {
  title: string;
  createdAt: string;
  description: string;
  imageType: string;
  imageData: string;
  slug: string;
  content: string;
  author: {
    firstname: string;
    secondname: string;
  };
}
const UserPostDescription = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        setPosts(data?.data || []);
        if (slug) {
          const foundPost = data?.data.find((p: Post) => p.slug === slug);
          setPost(foundPost || null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchPosts();
  }, [slug]);

  if (!post) {
    return <p className="text-center text-xl font-semibold mt-10">Post not found</p>;
  }

  const handleClick = () => {

  };

  return (
 <UserLayout>
      <div className="container mx-auto p-4 ">
      <div className=" h-screen">

          {/* First column: Post content */}
          <div className="bg-white overflow-y-scroll rounded-lg no-scrollbar shadow-md overflow-hidden">
            <img
              src={`data:${post.imageType};base64,${post.imageData}`}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-sm text-gray-500 mb-6">
                {post.createdAt} &middot; By <span className="font-medium text-gray-700"> {post.author.firstname} {post.author.secondname}</span>
              </p>
              <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.description }} />
              <div
                className="prose prose-lg max-w-none text-gray-800 mt-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>

      
        </div>
      </div>
      </UserLayout>
  );
};

export default UserPostDescription;
