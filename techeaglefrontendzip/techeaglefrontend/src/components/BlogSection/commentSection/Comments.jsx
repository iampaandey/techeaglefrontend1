// src/components/comments/Comments.jsx
import { useState } from 'react';
import { FaCircle } from 'react-icons/fa'; // Dot icon for connecting threads
import { addCommentApi } from '../../../redux/api';
import { useDispatch } from 'react-redux';
import { getBlogsThunk2 } from '../../../redux/features/blogSlice';
import AlertBox from '../../alerts/AlertBox';

const Comments = ({ comments, blogId }) => {
  const [newComment, setNewComment] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const dispatch = useDispatch()
  const handleAddComment = async() => {
    if (newComment.trim()) {
      const formData = {
        blogId,
        comment:newComment
      }
      setAlert({type:"w", message:"Adding comment!"})
      await addCommentApi(formData)
      dispatch(getBlogsThunk2())
      setNewComment('');
    }
  };

  const renderComments = (comments, level = 0) => {
    return comments?.map((comment, index) => (
      <div key={comment.author._id} className={`relative pl-${level * 6} mb-4`}>
        {level > 0 && (
          <div className={`absolute left-${level * 6 - 4} top-1/2 transform -translate-y-1/2 w-2 h-full border-l-2 ${level > 0 ? 'border-gray-400' : 'border-transparent'}`} />
        )}
        <div className="flex items-start">
          <div className={`flex items-start ${index === comments.length - 1 && level > 0 ? 'pb-4' : ''}`}>
            {index !== comments.length - 1 && level > 0 && (
              <FaCircle className="text-gray-400 mt-1" />
            )}
            <div className="ml-4 flex flex-col w-full">
              <p className="font-semibold text-blue-600">{comment.author.username}</p>
              <p className="text-gray-800">{comment.text}</p>
              {comment.replies && comment.replies.length > 0 && (
                <div className={`mt-2 ${level > 0 ? 'border-l-2 border-gray-400 pl-4' : ''}`}>
                  {renderComments(comment.replies, level + 1)}
                </div>
              )}
            </div>
          </div>
        </div>
        {alert.message && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      )}
      </div>
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <div className="mb-4">
        {renderComments(comments)}
      </div>
      <div className="mt-4 flex flex-col">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded-md resize-none h-24"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
