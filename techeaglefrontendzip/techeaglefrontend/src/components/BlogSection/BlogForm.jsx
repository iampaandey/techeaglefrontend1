import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBlogThunk } from '../../redux/features/blogSlice';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLoacation] = useState('');
  const [imgUri, setImgUri] = useState("");
  const [videoUri, setVideoUri] = useState("");
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      navigate('/login')
    }
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imgUri)
    formData.append('video', videoUri)
    formData.append('location', location)

    dispatch(addBlogThunk({formData, navigate}))

  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  
  const handleImg = async(event)=>{
    document.getElementById('image').style.border="2px solid green"
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setImgUri(base64);
  }
  const handleVideo = async(event)=>{
    document.getElementById('vdo').style.border="2px solid green"
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setVideoUri(base64);
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mb-4 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-6">New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        

        

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <input
            id="image"
            onChange={(e)=>handleImg(e)}
            className="w-full p-2 border border-gray-300 rounded-md"
            type='file'
            accept='image/*'
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="vdo" className="block text-sm font-medium text-gray-700 mb-2">Video</label>
          <input
            id="vdo"
            onChange={(e)=>handleVideo(e)}
            className="w-full p-2 border border-gray-300 rounded-md"
            type='file'
            accept='video/*'
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="loc" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            id="title"
            value={location}
            onChange={(e) => setLoacation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;