import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TagEndpoints } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const BASE_URL = process.env.REACT_APP_BASE_URL

const UpdatePost = () => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  // const [tags, setTags] = useState([]);
  const tags = useSelector((state) => state.tags.tags)
  const TAGS_API = TagEndpoints.TAGS_API; // Replace with your actual API endpoint
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  console.log("ID is ", id)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/post/getPost/${id}`);
        const data = await response.json();
        // console.log("ReSPOnse is ", data);

        if (data.success) {
          const post = data.data;
          setTitle(post.title);
          setSummary(post.summary);
          setContent(post.content);
          setSelectedTag(post.Tag._id); // Assuming the tag ID is stored in post.Tag._id
          setThumbnail(post.thumbnail);
          // console.log("tag name is ", post.Tag.name);
        } else {
          console.error('Failed to fetch post:', data.message);
          toast.error("Failed to fetch post")
        }
      } catch (error) {
        console.error('Error fetching post:', error.message);
        toast.error("Failed to fetch post")
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const toastId = toast.loading("Updating blog...")
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('tag', selectedTag);
      formData.append('thumbnail', thumbnail);

      const response = await axios.put(`${BASE_URL}/post/updatePost/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for FormData
        },
      });

      console.log("response.data.success", response.data)

      if (response.data.success) {
        // console.log('Blog post updated successfully:', response.data.message);
        toast.success("Blog updated")
        navigate("/")
      } else {
        console.error('Failed to update blog post:', response.data.message);
        toast.error("Failed to update Blog")
      }
      toast.dismiss(toastId)
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error("Failed to update Blog")
    }
  };


  console.log("ALl tags are", tags)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    // Create a temporary URL for the selected file
    setThumbnailUrl(URL.createObjectURL(file));
  };

  if (!token) {
    navigate("/login")
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Update Blog Post</h2>
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
          onChange={(e) => {
            setSelectedTag(e.target.value)
            console.log("Selected tag is ", selectedTag)
          }}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Select a tag</option>
          {tags.map(tag => (
            <option key={tag._id} value={tag._id}>{tag.name}</option>
          ))}
        </select>
      </div>
      {/* <div>
        <h2>Change thumbnail</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="mb-4"
        />
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt="Thumbnail Preview" className="w-40 h-40 object-cover mb-4" />
        )}
      </div> */}
      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default UpdatePost;

