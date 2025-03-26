import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TagEndpoints } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getProfile } from '../services/operations/authAPI';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Write = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [tags, setTags] = useState([]);
  const TAGS_API = TagEndpoints.TAGS_API; // Replace with your actual API endpoint
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchTags = async () => {
    try {
      setLoading(true)
      console.log('Fetching tags...');
      const response = await apiConnector('GET', TAGS_API);
      console.log('Printing tags', response);

      // Check if the response is successful and has the expected structure
      if (response.data && response.data.success) {
        setTags(response.data.data); // Set the tags array
      } else {
        console.log('Invalid response structure:', response);
        toast.error("Failed to fetch Tags")
        throw new Error('Invalid response structure');
      }
      setLoading(false)
    } catch (error) {
      console.log('Could not fetch the tag list');
      console.error(error); // Log the full error object for more details
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const handleSave = async () => {
    try {
      const toastId = toast.loading("Creating blog...")
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('tag', selectedTag);
      formData.append('thumbnail', thumbnail);

      console.log("title is", title)
      console.log("summary is", summary)
      console.log("content is", content)
      console.log("selectedTag is", selectedTag)
      console.log("thumbnail is", thumbnail)

      console.log("Printing token", token)
      // const response = await apiConnector('GET', `/api/tags/${post.Tag}`);
      const response = await axios.post(`${BASE_URL}/post/createPost`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log('Blog post saved successfully:', response.data.message);
        toast.success("Blog created")
        // dispatch(getProfile());
        dispatch(getProfile(token));
        navigate("/")
      } else {
        console.error('Failed to save blog post:', response.data.message);
        toast.error("Failed to create Blog")
      }
      toast.dismiss(toastId)
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error("Failed to create Blog")
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  if(!token){
    navigate("/login")
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Write a Blog Post</h2>
      <div>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Title"
        />
      </div>
      <div>
        <h2>Summary</h2>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Summary"
        ></textarea>
      </div>
      <div>
        <h2>Content</h2>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          value={content}
          onChange={(value) => setContent(value)}
        />

      </div>
      <div>
        <h2>Select Tag</h2>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Select a tag</option>
          {tags.map(tag => (
            <option key={tag._id} value={tag._id}>{tag.name}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Select thumbnail</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="mb-4"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default Write;
