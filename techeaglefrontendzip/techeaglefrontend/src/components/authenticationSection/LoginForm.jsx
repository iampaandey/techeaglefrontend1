import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginThunk } from '../../redux/features/userSlice';
import AlertBox from '../alerts/AlertBox';

const LoginForm = ({ onRegisterClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {data,error}=useSelector((state)=>({...state.user}));
    const [alert, setAlert] = useState({ type: '', message: '' });

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setAlert({type:'warning',message:'Request In Progress'})
        let formData={
            email,
            password
        }
        dispatch(loginThunk(JSON.stringify(formData)));
        // Handle login logic here
        console.log({ email, password });
    };
    useEffect(()=>{
    if(data){
        console.log("found data so this useeffec ran")
        localStorage.setItem('token',data);
        navigate('/');
    }
    else if(error){
   setAlert({type:'error',message:error?.message});
    }
    },[data, error, navigate])

    return (
        <>
         {alert.message && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      )}
        <div className="mt-8 flex items-center justify-center font-sans p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form>
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
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Not registered?{' '}
                 <Link to='/register'>   <button
                        onClick={onRegisterClick}
                        className="text-indigo-500 hover:underline"
                    >
                        Create an account
                    </button></Link>
                </p>
            </div>
        </div>
        </>
    );
};

export default LoginForm;
