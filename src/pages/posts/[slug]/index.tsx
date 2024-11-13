/* eslint-disable @next/next/no-img-element */
import Button from "@/Components/Button";
import Layout from "@/Components/globalComponent/Landingpage/MainLayout";
import { getPost } from "@/service/landingService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Define the type for the post object
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

const PostDescription: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all posts and the specific post if a slug is available
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

  if (error) {
    return (
      <p className="text-center text-xl font-semibold mt-10 text-red-500">
        {error}
      </p>
    );
  }

  if (!post) {
    return (
      <p className="text-center text-xl font-semibold mt-10">Post not found</p>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 h-screen">
          {/* First column: Post content */}
          <div className="bg-white overflow-y-scroll rounded-lg no-scrollbar shadow-md overflow-hidden">
            <img
              src={`data:${post.imageType};base64,${post.imageData}`}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {post.title}
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                {post.createdAt} &middot; By{" "}
                <span className="font-medium text-gray-700">
                  {post.author.firstname} {post.author.secondname}
                </span>
              </p>
              <div className="prose prose-lg max-w-none text-gray-800">
                {post.description}
              </div>
              <div
                className="prose prose-lg max-w-none text-gray-800 mt-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>

          {/* Second column: Related posts or widgets */}
          <div className="bg-gray-3 overflow-y-scroll p-6 rounded-lg no-scrollbar shadow-md sticky top-4">
            <h1 className="text-xl font-semibold">Recent Posts</h1>
            {posts.map((item, index) => (
              <div
                key={index}
                className="w-full px-2 md:px-2 rounded-lg mt-4 shadow-lg bg-white"
              >
                <div className="flex flex-col-reverse md:flex-row">
                  <div className="flex p-3">
                    <img
                      src={`data:${item.imageType};base64,${item.imageData}`}
                      alt={item.title}
                      className="object-cover w-20 h-25"
                    />
                  </div>

                  <div className="flex flex-col w-2/3 px-4 py-3.5 text-primary">
                    <div className="border-gray-300 text-left">
                      <p className="text-sm md:text-sm font-medium mb-2 md:mb-2">
                        {item.createdAt}
                      </p>
                      <h1 className="text-xl md:text-lg font-bold mb-2 md:mb-2">
                        {item.title.length > 15
                          ? item.title.substring(0, 15) + "..."
                          : item.title}
                      </h1>

                      <Link href={`/posts/${item.slug}`}>
                        <div className="text-right">
                          <Button
                            label="Read"
                            onClick={() => router.push(`/posts/${item.slug}`)}
                            variant="secondary"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDescription;
