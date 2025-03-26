import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className='px-4'>
      <div className='mx-auto flex flex-col items-center'>
        <div className="flex items-center p-8">
          <img
            src={user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mr-4"
          />
          <div>
            <h1 className="text-4xl font-semibold text-richblack-200 font-Madimi">
              {`${user.firstName} ${user.lastName}`}
            </h1>
            <p className="text-gray-600 text-xl">
              {user.email}
            </p>
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-semibold font-Madimi">Posts</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8'>
          {user.Posts.map((post) => (
            <div key={post._id} className=''>
              <div className='flex'>
                <div className='p-2 w-full'>
                  <Link to={`/post/${post._id}`}>
                    <div className='border border-gray-200 p-4 rounded-xl hover:bg-gray-50 transition'>
                      <div className='h-64 overflow-hidden'>
                        <img src={post.thumbnail} alt={post.title} className='w-full h-full object-cover mb-4 rounded-xl' />
                      </div>
                      <h2 className='text-xl font-bold mb-2 line-clamp-2'>{post.title}</h2>
                      <p className='text-md line-clamp-3'>{post.summary}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;