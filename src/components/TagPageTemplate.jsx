import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TagPagePostTemplate from './TagPagePostTemplate';
import { setLoading } from '../slices/profileSlice';
import { RiseLoader } from "react-spinners"
const BASE_URL = process.env.REACT_APP_BASE_URL

const TagPageTemplate = () => {
    const { id } = useParams();
    // console.log("tagId", id);

    const [details, setDetails] = useState(null);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${BASE_URL}/post/getTag/${id}`);
                const data = await response.json();

                if (data.success) {
                    setDetails(data.data);
                    setPosts(data.data.Posts)
                    // console.log("tag page tag detail fetched", data.data.Posts)
                } else {
                    console.error('Failed to fetch tag details:', data.message);
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching tag details:', error.message);
                setLoading(false)
            }
        };

        fetchTagDetails();
    }, [id]);

    // console.log("printing details", details);
    // console.log("Printing all posts", posts)

    return (
        <div className=''>
            {
                loading ? (
                    <div className='flex justify-center items-center h-screen '>
                        <RiseLoader color="#999DAA" />
                    </div>
                ) : (
                    <div className='px-16'>
                        {details && (
                            <div className='p-4 '>
                                <div className='p-4'>
                                    <h2 className='text-3xl font-mono'>
                                        Tag: {details.name}
                                    </h2>
                                    <p className='font-serif mt-2 text-lg'>
                                        {details.description}
                                    </p>
                                </div>

                                <div className='grid grid-cols-3 gap-4'>
                                    {/* Displaying all posts related to this tag */}
                                    {posts.length >= 1 ? (
                                        posts.map(post => (
                                            <TagPagePostTemplate key={post._id} post={post} />
                                        ))
                                    ) : (
                                        <div className='text-3xl justify-center mt-8 items-center'>
                                            No post to show
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default TagPageTemplate;
