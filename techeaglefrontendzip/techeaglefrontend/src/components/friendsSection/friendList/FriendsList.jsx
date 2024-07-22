
const FriendsList = ({ friends }) => {
  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} className="p-2 border-b border-gray-200">
            {friend.username}
          </li>
        ))}
      </ul>
      {friends.length === 0 && <p className="text-gray-500">No friends added yet.</p>}
    </div>
  );
};

export default FriendsList;
