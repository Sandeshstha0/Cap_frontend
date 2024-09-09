/* eslint-disable @next/next/no-img-element */
import Button from '@/Components/Button';
import Layout from '@/Components/globalComponent/Landingpage/MainLayout';
import { PostData } from '@/Data/Data';
import Link from 'next/link';
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

  const handleClick = () => {

  };

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-24 ">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 h-screen">

          {/* First column: Post content */}
          <div className="bg-white overflow-y-scroll rounded-lg no-scrollbar shadow-md overflow-hidden">
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

          {/* Second column: Related posts or widgets */}
          <div className="bg-gray-3 overflow-y-scroll p-6 rounded-lg no-scrollbar shadow-md sticky top-4">

            <h1 className='text-xl font-semibold'>Recent Post</h1>
            {PostData.map((item, index) =>
              <div key={index} className='w-full px-2 md:px-2  rounded-lg mt-4 shadow-lg bg-white' >
                <div className='flex flex-col-reverse md:flex-row '>
                  <div className='flex p-3  '>
                    {/* <Image src="/aboutus.png" alt='' width={500} height={500} className='rounded-xl' /> */}
                    <img src={item.image} className='object-cover w-20 h-25   ' alt='Background' />
                  </div>

                  <div className='flex flex-col w-2/3 px-4 py-3.5 text-primary'>
                    <div className=' border-gray-300 text-left'>
                      <p className='text-sm md:text-sm font-medium mb-2 md:mb-2'>
                        {item.time}
                      </p>
                      <h1 className='text-xl md:text-lg font-bold mb-2 md:mb-2'>
                        {item.title.length > 15 ? item.title.substring(0, 15) + '...' : item.title}
                      </h1>

                      <Link href={`/posts/${item.slug}`}>
                        <div className='text-right' >
                          <Button label="Read" onClick={handleClick} variant="secondary" />
                        </div>
                      </Link>


                    </div>

                  </div>


                </div>


              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDescription;
