import React, { useState, useEffect } from 'react';
import Post from '../Post';
import { NavbarLinks } from '../../data/NavbarLinks';
import { Link } from 'react-router-dom';
import { PostEndPoints } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import { RiseLoader } from "react-spinners";

const HomeLeft = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postCount, setPostCount] = useState(5); // Number of posts to initially display

    const GETPost_API = PostEndPoints.GETPost_API;

    const fetchPosts = async () => {
        try {
            setLoading(true);
            // console.log("Fetching posts");
            const response = await apiConnector('GET', GETPost_API);
            // console.log('Printing all posts', response);

            if (response.data && response.data.success) {
                setPosts(response.data.data);
            } else {
                console.log('POSTS: Invalid response structure:', response);
                throw new Error('POSTS: Invalid response structure');
            }
            setLoading(false);
        } catch (error) {
            console.log('Could not fetch the post list');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const loadMorePosts = () => {
        setPostCount(prevCount => prevCount + 5); // Increase post count by 5
    }

    return (
        <div className='flex flex-col w-full h-screen mb-24'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <RiseLoader color="#999DAA" />
                </div>
            ) : (
                <div className='px-40'>
                    {/* Map over posts and render Post component for each post */}
                    {posts.slice(0, postCount).map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                    {postCount < posts.length && (
                        <button onClick={loadMorePosts} className='mt-4 mb-8 bg-blue-500 text-white px-4 py-2 rounded'>
                            Load More...
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomeLeft;
