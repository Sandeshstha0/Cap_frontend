/* eslint-disable @next/next/no-img-element */
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import { PostData } from '@/Data/Data';
import { useRouter } from 'next/router';

const PostDescription = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Log slug to verify it's being read correctly
  console.log('Slug:', slug);

  // Find the post based on the slug
  const post = PostData.find((p) => p.slug === slug);

  if (!post) {
    return <p className="text-center text-xl font-semibold mt-10">Post not found</p>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-18">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
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
      </div>
    </Layout>
  );
};

export default PostDescription;
