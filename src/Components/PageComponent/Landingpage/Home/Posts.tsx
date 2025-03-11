/* eslint-disable @next/next/no-img-element */
import { PostData } from "@/Data/Data";
import Link from "next/link";
import Button from "@/Components/Button";
import Image from "next/image";

// Post Card Component
const PostCard: React.FC<{ post: any }> = ({ post }) => {
  return (
    <div className="bg-secondary rounded-lg shadow-lg mt-4">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="p-3">
          <img
            src={post.image}
            alt="Post Image"
            className="object-cover w-35 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-2/3 px-4 py-3.5 text-primary">
          <div className="text-left">
            <p className="text-sm font-medium mb-2">{post.time}</p>
            <h1 className="text-xl font-bold mb-2">{post.title}</h1>
            <Link href={`/posts/${post.slug}`}>
              <div className="text-right">
                <Button onClick={() => {/* Your logic here */}}label="Read" variant="secondary" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Posts: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between px-24 mt-24">
        <h1 className="text-5xl font-semibold text-secondary px-6">Posts</h1>
        <Link href="/posts">
          <p className="text-secondary font-light hover:cursor-pointer">
            See more
          </p>
        </Link>
      </div>

      {/* Main Posts Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 max-w-screen-lg mx-auto text-center text-white">
        {/* Single Post Preview Card */}
        <div className="bg-gray-100 p-6">
          <div className="shadow-lg items-center rounded-lg cursor-pointer bg-boxdark dark:text-white transition hover:shadow-xl">
            <div className="w-full h-52 overflow-hidden mb-4 p-4 pb-0 rounded-t-lg">
              <Image
                src="/aboutus.png"
                alt="Budget Categories Image"
                width={600}
                height={1000}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6 text-left">
              <div className="pb-4 border-b border-gray-300 dark:border-gray-600">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2">
                  September 29, 2024
                </p>
                <h2 className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-3">
                  Budget Categories: Long list or short list
                </h2>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text ever since the 1500s...
                </p>
              </div>
              <div className="text-right mt-6 space-x-4">
                <Button onClick={() => {/* Your logic here */}} label="Read" variant="primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Map through Post Data */}
        <div className="w-full">
          {PostData.slice(0, 3).map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
