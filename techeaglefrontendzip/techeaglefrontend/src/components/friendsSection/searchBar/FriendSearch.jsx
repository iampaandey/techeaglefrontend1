import { useState, useEffect } from 'react';
import AlertBox from '../../alerts/AlertBox';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendThunk, resetFriendRequestThunk } from '../../../redux/features/friendSlice';

const FriendSearch = ({ friends, friendslist }) => {
  const [alert, setAlert] = useState({ type: '', message: '' });
  const dispatch = useDispatch();
  const { friendRequest } = useSelector((state) => ({ ...state.friend }));
  
  // Transform friends array to match mockUsers structure
  const user = JSON.parse(localStorage?.getItem('user'))?.username;
  const Users = friends.map(friend => ({
    id: friend._id,
    name: friend.username
  }));
  const mockUsers = Users.filter((e) => e?.name !== user);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockUsers); // Initialize results with all users

  useEffect(() => {
    if (query === '') {
      setResults(mockUsers); // Show all users if query is empty
    } else {
      const filteredResults = mockUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [query, mockUsers]);

  useEffect(() => {
    if (friendRequest) {
      setAlert({ type: 'success', message: friendRequest.message });
      dispatch(resetFriendRequestThunk());
    }
  }, [friendRequest, dispatch]);

  const handleAddFriend = (friend) => {
    setAlert({ type: 'warning', message: 'Friend Request Being Sent' });
    let formData = {
      friendId: friend.id
    };
    dispatch(addFriendThunk(formData));
    setQuery('');
    setResults(mockUsers); // Reset results to show all users
  };

  return (
    <>
      {alert.message && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      )}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for friends..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <ul className="mt-2">
          {results.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              {user.name}
              {friendslist.some(friend => friend.id === user.id) ? (
                <span className="text-gray-500">Friend</span>
              ) : (
                <button
                  onClick={() => handleAddFriend(user)}
                  className="bg-indigo-500 text-white p-1 rounded-md hover:bg-indigo-600"
                >
                  Add Friend
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendSearch;
