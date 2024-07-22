import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TabSection = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const { data } = useSelector((state) => ({ ...state.user }));

  // Function to check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return data || token;
  };

  // Update the tabs array based on whether user is logged in or not
  const tabs = ['Home', 'Friend', 'Blog', isLoggedIn() ? 'Log Out' : 'Log In'];

  useEffect(() => {
    console.log("useEffect of tab ran");
    console.log(activeTab);
    if (isLoggedIn()) {
      setActiveTab('Home'); // Optional: Reset to Home tab on data change
    }
  }, [data]);

  const handleLogOut = () => {
    if (isLoggedIn()) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4">
      <div className="flex flex-wrap space-x-2 bg-blue-900 p-2 rounded-lg">
        {tabs.map((tab) => (
          <Link
            key={tab}
            to={tab === 'Home' ? '/' : tab.replace(' ', '').toLowerCase()}
            className={`flex-1 text-center py-2.5 text-sm font-medium rounded-lg
              ${activeTab === tab ? 'bg-white text-black' : 'text-white hover:bg-blue-800'}`}
            onClick={() => {
              if (tab === 'Log Out') {
                handleLogOut();
              } else {
                setActiveTab(tab);
              }
            }}
          >
            {tab}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabSection;
