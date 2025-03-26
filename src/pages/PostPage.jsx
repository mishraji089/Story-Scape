import React, { useState, useEffect, CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/profileSlice';
import Comments from '../components/Comments';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { RiseLoader } from "react-spinners"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getProfile } from '../services/operations/authAPI';

const BASE_URL = process.env.REACT_APP_BASE_URL

const PostPage = () => {
    const { user } = useSelector((state) => state.profile);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [readingTime, setReadingTime] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log("user is", user);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/post/getPost/${id}`);
                const data = response.data;

                if (data.success) {
                    setPost(data.data);
                    setIsSaved(user?.savedPosts?.some((savedPost) => savedPost._id === data.data._id));
                } else {
                    console.error('Failed to fetch post:', data.message);
                    toast.error("cannot fetch post");
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };
        fetchPost();
    }, [id, user]);

    useEffect(() => {
        if (post) {
            const wordsPerMinute = 100; // Average reading speed
            const numberOfWords = post.content.split(/\s/g).length;
            const minutes = numberOfWords / wordsPerMinute;
            setReadingTime(Math.ceil(minutes));
        }
    }, [post]);

    const handleSavePost = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/savePost/${post._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setIsSaved(true);
                dispatch(getProfile(token));
                toast.success('Post saved successfully');
            } else {
                toast.error('Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error.message);
            toast.error('Failed to save post');
        }
    };

    const handleUnsavePost = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/unsavePost/${post._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setIsSaved(false);
                dispatch(getProfile(token));
                toast.success('Post unsaved successfully');
            } else {
                toast.error('Failed to unsave post');
            }
        } catch (error) {
            console.error('Error unsaving post:', error.message);
            toast.error('Failed to unsave post');
        }
    };

    const handleDelete = async () => {
        console.log("Token is ", token);
        try {
            const toastId = toast.loading("Deleting blog...");
            const response = await axios.delete(`${BASE_URL}/post/delete/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data.success == true) {
                toast.success("Blog deleted");
                navigate("/");
                window.location.reload();
            } else {
                toast.error("Error in deleting Blog");
            }
            toast.dismiss(toastId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mb-8'>
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <RiseLoader color="#999DAA" />
                </div>
            ) : (
                <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center gap-y-5 mt-8'>
                    {post && (
                        <>
                            <div className='font-bold text-3xl flex mt-4 mb-4 items-center justify-between font-Madimi tracking-widest'>
                                <h2 className='justify-center'>{post.title}</h2>
                            </div>
                            <div className='gap-x-2 justify-between w-9/12 flex items-center'>
                                <div className='flex items-center gap-2'>
                                    <img src={post.Author.image} className='h-[48px] w-[48px] rounded-full' alt="Author" style={{ zIndex: -50 }} />
                                    <div>
                                        <p className='text-black font-bold'>{`${post.Author.firstName} ${post.Author.lastName}`}</p>
                                        <div className='text-richblack-400 font-Madimi'>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4 items-center mt-4'>
                                    {((user?.email === post?.Author.email)) && (
                                        <div className='flex gap-4'>
                                            <Link to={`/edit-post/${post._id}`}>
                                                <FaEdit className='text-richblack-400 text-xl' />
                                            </Link>
                                            <button onClick={handleDelete}>
                                                <MdDelete className='text-xl text-richblack-400' />
                                            </button>
                                        </div>
                                    )}
                                    {user && (
                                        <>
                                            {isSaved ? (
                                                <button onClick={handleUnsavePost}><FaBookmark className='text-md text-richblack-400' /></button>
                                            ) : (
                                                <button onClick={handleSavePost}><FaRegBookmark className='text-md text-richblack-400' /></button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='text-xl text-richblack-400'>
                                Estimated reading time: {readingTime} minute{readingTime !== 1 ? 's' : ''}
                            </div>
                            <div className='h-96' style={{ zIndex: -50 }}>
                                <img src={post.thumbnail} alt="Post Thumbnail" className="w-full h-full rounded-xl" />
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} className='p-6 ml-6 w-11/12 overflow-hidden' />
                            <Comments postId={id} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostPage;
