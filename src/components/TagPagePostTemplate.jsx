import React from 'react';
import { Link } from 'react-router-dom';
import "./TagPagePostTemplate.css"

const TagPagePostTemplate = ({ post }) => {
    return (
        <div className='flex'>
            <div className=''>
                <div className='cursor-pointer'>
                    <Link to={`/post/${post._id}`}>
                        <div className='border border-gray-200 p-4 rounded-xl'>
                            <div className='h-64 overflow-hidden'>
                                <img src={post.thumbnail} alt={post.title} className='w-full h-full object-cover mb-4 rounded-xl' />
                            </div>
                            <h2 className='text-xl font-bold mb-2 mt-2 line-clamp-2'>{post.title}</h2>
                            <p className='text-md line-clamp-3'>{post.summary}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TagPagePostTemplate;
