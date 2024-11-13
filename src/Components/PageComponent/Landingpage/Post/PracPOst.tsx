/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface Post {
    id: number;
    title: string;
    description: string;
    imageType: string; // This represents the type of the image
    imageData: string; // Assuming this is a base64 encoded string
}

const PracPost: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Initialize as an empty array
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('/posts/user-posts');
                setPosts(response.data); // Directly set response.data based on your structure
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };

        fetchPosts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!posts || posts.length === 0) {
        return <div>No posts available</div>; // Handle the case when there are no posts
    }

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    {post.imageData && (
                        <img
                            src={`data:${post.imageType};base64,${post.imageData}`}
                            alt={post.title}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default PracPost;
