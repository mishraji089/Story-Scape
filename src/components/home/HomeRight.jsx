import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrendingPost from './TrendingPost';
import { apiConnector } from '../../services/apiconnector';
import { TagEndpoints } from '../../services/apis';
import { fetchTagsFailure, fetchTagsRequest, fetchTagsSuccess, } from '../../slices/Tag';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RiseLoader } from "react-spinners"
import { IoIosTrendingUp } from "react-icons/io";
const BASE_URL = process.env.REACT_APP_BASE_URL


const HomeRight = () => {
  // const [tags, setTags] = useState([]);
  const TAGS_API = TagEndpoints.TAGS_API;

  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  // const { user } = useSelector((state) => state.profile);

  // const tags = "heleloeo"
  const { loading } = useSelector((state) => state.tags);
  // const loading = false

  const [randomPosts, setRandomPosts] = useState([])
  const [postLoading, setPostLoading] = useState(false)



  useEffect(() => {
    const fetchTags = async () => {
      dispatch(fetchTagsRequest());
      try {
        const response = await apiConnector("GET", TAGS_API);
        dispatch(fetchTagsSuccess(response.data.data));
        // console.log("response is", response.data.data)
      } catch (error) {
        dispatch(fetchTagsFailure(error.message));
      }
    };

    const fetchRandomPosts = async () => {
      try {
        setPostLoading(true)
        const response = await axios.get(`${BASE_URL}/post/getRandomPosts`);
        // console.log("responsesssss is", response)
        // console.log("response.data.success", response.data.success)
        // console.log("response.data.data", response.data.posts)
        if (response.data.success === true) {
          setRandomPosts(response.data.posts);
        } else {
          toast.error("Could not fetch recommended posts")
        }
        setPostLoading(false)
      } catch (error) {
        console.log("Could not fetch random posts");
        setPostLoading(false)
      }
    };


    fetchTags();
    fetchRandomPosts()
  }, [dispatch]);

  // console.log("Tags are ", tags.map(tag => tag.name).join(", "));
  // console.log("random posts are", randomPosts);
  // console.log("random posts length i", randomPosts.length);

  return (
    <div className=''>
      {/* Tags */}
      <div className="flex flex-col justify-start items-start gap-6 mt-16">
        <h2 className="text-3xl font-semibold text-richblack-300">
          <span className="">Tags</span>
        </h2>
        <div className="flex gap-4 flex-wrap">
          {loading ? (
            <div>Loading......</div>
          ) : (
            Array.isArray(tags) &&
            tags.map((tag, index) => (
              <Link to={`/tags/${tag._id}`} key={index}>
                <p className="border border-richblack-50 rounded-3xl px-3 py-1">{tag.name}</p>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Trending Posts */}
      <div className="mt-8">
        <div>
          <h2 className="text-3xl font-semibold flex gap-2 items-center text-richblack-400">
            <span className="">
              Recommended Posts
            </span>
            <IoIosTrendingUp />
          </h2>
          <div className="flex flex-col gap-8 mt-8">
            {/* <TrendingPost post={randomPosts}/> */}
            {
              postLoading ? (
                <div className='flex justify-center items-center'>
                  <RiseLoader color="#838894" />
                </div>
              ) : (
                randomPosts.map((post, index) => (
                  <TrendingPost key={post._id} post={post} index={index} />
                )))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
