import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertBox from '../alerts/AlertBox';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk, resetErrorThunk, resetRegThunk } from '../../redux/features/userSlice';

const RegistrationForm = ({ onLoginClick }) => {
  const [username, setUsername] = useState(''); // Added state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const dispatch = useDispatch();
  const { registration, error } = useSelector((state) => ({ ...state.user }));
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    setAlert({type:"warning",message:"Hang Tight ! Request In Process"})
    e.preventDefault();
    let formData = {
      username, // Include username in the form data
      email,
      password
    };
    if (password === confirmPassword) {
      dispatch(registerThunk(formData));
    } else {
      setAlert({ type: "error", message: "Password and Confirm Password Must Be Equal" });
    }
    // Handle registration logic here
    console.log({ username, email, password, confirmPassword });
  };

  useEffect(() => {
    if (registration) {
      // Handle successfull registration or other logic here
      setAlert({type:"success",message:"Registration Successfull. Please Login."})
      dispatch(resetRegThunk());
      navigate('/login')
    } else if(error){
      // Handle failed registration here
      setAlert({type:"warning",message:"This email already exists"});
      dispatch(resetErrorThunk());
    }
  }, [registration, error]);

  return (
    <>
      {alert.message && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      )}
      <div className="mt-8 flex items-center justify-center font-sans p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already registered?{' '}
            <Link to='/login'>
              <button
                onClick={onLoginClick}
                className="text-indigo-500 hover:underline"
              >
                Login
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
