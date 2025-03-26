import React from 'react'
import { Link } from 'react-router-dom'

const TrendingPost = ({ post, index }) => {
    return (
        <div className='flex'>
            <div className='flex w-[30%] '>
                <p className='text-7xl text-richblack-100 justify-center items-center p-4'>
                    0{index + 1}
                </p>
            </div>
            <div className='w-[90%]'>
                <Link to={`/post/${post._id}`}>
                    <div className='flex flex-col w-[80%] gap-2'>
                        {/* info */}
                        <div className='flex felx-row gap-2 items-center'>
                            <img src={post.Author.image} className='h-[24px] w-[24px] rounded-full'></img>
                            <h3 className=''>{post.Author.firstName} {post.Author.lastName}</h3>
                        </div>

                        {/* heading */}
                        <h3 className='font-bold items-center overflow-hidden line-clamp-2'>{post.title}</h3>

                        <div className='flex gap-8'>
                            {/* time */}
                            <div className='text-richblack-400'>
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TrendingPost