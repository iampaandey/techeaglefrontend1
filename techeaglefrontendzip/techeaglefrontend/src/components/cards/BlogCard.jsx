import { FaHeart, FaComment } from 'react-icons/fa';
import { likeApi } from '../../redux/api';
import { useDispatch } from 'react-redux';
import {  getBlogsThunk2 } from '../../redux/features/blogSlice';
import AlertBox from '../alerts/AlertBox';
import { useEffect, useRef, useState } from 'react';
import {jwtDecode} from "jwt-decode";
import Comments from '../BlogSection/commentSection/Comments';

const BlogCard = ({ username, timestamp, title, image, location, video, description, style, count, blogId, likes, comments }) => {
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isLiked, setIsLiked] = useState(false)
  const [isComment, setIsComment] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
    const data = jwtDecode(token)
    const uid = data.user.id;
    console.log(likes.includes(uid))
    setIsLiked(likes.includes(uid))
    }
  },[])
  
  const convertToIST = (utcDate) => {
    return new Date(utcDate).toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour time
    });
  };
  
  const dispatch = useDispatch();
  const formData = { blogId };

  const handleLike = async () => {
    if (isLiked) {
      setAlert({ type: 'warning', message: 'Already Liked!' });
    } else {
      setIsLiked(true)
      document.getElementById("likebtn").classList.add('text-red-500')
      await likeApi(formData);
      dispatch(getBlogsThunk2());
    }
  };

  const istDateString = convertToIST(timestamp);
  console.log(timestamp, istDateString);

  return (
    <>
      {alert.message && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      )}
      <div
        style={style}
        className="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl my-4"
      >
        <div className="md:flex items-center justify-center">
          <div className="flex flex-col items-center justify-center border-2 border-blue-900 rounded-xl shadow-md p-8">
            <div className="tracking-wide text-sm text-indigo-500 font-semibold">
              {username}
            </div>
            <div className="tracking-wide text-sm text-indigo-500">
              {location}
            </div>
            <div className="mt-1 mb-1">
              <span className="text-gray-600 text-sm">{istDateString}</span>
            </div>
            <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {title}
            </div>
            <div className="mt-2">
              <img className='w-64' src={image} alt="image" />
            </div>
            <div className="mt-2 text-gray-500">{description}</div>
            <div className="mt-2">
              <video controls>
                <source src={video} type='video/mp4' />
              </video>
            </div>
            <div className="mt-4 flex items-center">
              <button onClick={handleLike} id='likebtn' className={
                isLiked  ? "flex items-center text-red-500 hover:  mr-4" : "flex items-center text-gray-500 hover:text-red-500 mr-4"
              }>
                <FaHeart className="mr-1" />
                <p>{count}</p>
              </button>
              <button onClick={()=>setIsComment(true)} className="flex items-center text-gray-500 hover:text-blue-500">
                <FaComment className="mr-1" />
              </button>
              </div>
                {
                  isComment && <Comments blogId={blogId} comments={comments} />
                }
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
