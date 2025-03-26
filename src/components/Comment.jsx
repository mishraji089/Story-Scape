import React from 'react';
import moment from 'moment';
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Comment = ({ comment }) => {
    const { user } = useSelector((state) => state.profile);

    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/post/${comment.PostId}/comment/${comment._id}`);
            toast.success("Comment deleted")
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.success("Failed to delete comment")
        }
    };

    return (
        <div className="border border-richblack-100 p-4 rounded-xl my-2 lg:mx-16 sm:mx-2">
            <div className=" flex items-center justify-between">
                <div className='flex gap-2 items-center'>
                    <img src={comment.Author.image} alt="Author" className="h-8 w-8 rounded-full mr-2" />
                    <span className="font-bold">{comment.Author.firstName}</span>
                    <p className="text-richblack-500">Posted on {moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

                </div>
                {
                    user?.email === comment.Author.email ? (<div>
                        <AiOutlineDelete className='text-xl cursor-pointer' onClick={handleDelete} />
                    </div>) : (<div></div>)
                }
            </div>
            <div>
                <p className="mt-2">{comment.comment}</p>
            </div>

        </div>
    );
};

export default Comment;

