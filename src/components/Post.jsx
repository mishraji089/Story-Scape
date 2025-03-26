import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

const Post = ({ post }) => {
    const [tagName, setTagName] = useState('');
    const [author, setAuthor] = useState(null);
    const [saved, setSaved] = useState(false)
    const [readingTime, setReadingTime] = useState(0);

    // console.log("Printing post details", post);

    const fetchTagName = async () => {
        try {
            const response = await apiConnector('GET', `/api/tags/${post.Tag}`);
            if (response.data && response.data.success) {
                setTagName(response.data.data.tagName);
            } else {
                console.log('Error fetching tag name:', response);
            }
        } catch (error) {
            console.error('Error fetching tag name2:', error);
        }
    };

    const fetchAuthorDetails = async () => {
        try {
            // Assuming the user details are included in the 'Author' field of the post
            setAuthor(post.Author);
        } catch (error) {
            console.error('Error fetching author details:', error);
        }
    };

    useEffect(() => {
        fetchTagName();
        fetchAuthorDetails();
    }, []);

    useEffect(() => {
        if (post) {
            const wordsPerMinute = 100; // Average reading speed
            const numberOfWords = post.content.split(/\s/g).length;
            const minutes = numberOfWords / wordsPerMinute;
            setReadingTime(Math.ceil(minutes));
        }
    }, [post]);

    return (
        <div className='flex flex-row max-w-full mt-8 border-b-[1px] border-richblack-50 py-4 items-center gap-8'>
            {/* left section */}
            <div className='flex flex-col w-[80%] gap-2'>
                {/* info */}
                {author && (
                    <div className='flex gap-3 items-center'>
                        <img src={author.image} className='h-[32px] w-[px] rounded-full' alt="Author" />
                        <h3 className=''>{author.firstName} {author.lastName}</h3>
                    </div>
                )}

                {/* heading */}
                <Link to={`/post/${post._id}`}>
                    <div className='font-bold items-center overflow-hidden line-clamp-2 '>
                        {post.title}
                    </div>
                </Link>

                {/* summary */}
                <div className=''>
                    <div className='items-center overflow-hidden line-clamp-2'>
                        <p>{post.summary}</p>
                    </div>
                </div>

                <div className='flex gap-8 items-center'>
                    {/* Tag */}
                    <Link to={`/Tags/${post.Tag._id}`} className='border border-richblack-50 rounded-2xl px-2 py-1'>
                        {post.Tag.name || 'Loading...'} {/* Display tag name or "Loading..." while fetching */}
                    </Link>
                    {/* time */}
                    <div className='text-richblack-400'>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </div>

                </div>
                <div>
                    Estimated reading time: {readingTime} minute{readingTime !== 1 ? 's' : ''}
                </div>
            </div>
            {/* image */}
            <div className='justify-center items-center '>
                <Link to={`/post/${post._id}`}>
                    <img className="h-48 w-64 object-cover rounded-xl " src={post.thumbnail} alt={post.title} />
                </Link>
            </div>
        </div>
    );
};

export default Post;
