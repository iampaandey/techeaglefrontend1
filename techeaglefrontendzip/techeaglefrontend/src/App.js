import { Route, Router, Routes, Switch } from 'react-router-dom';
import './App.css';
import LoginForm from './components/authenticationSection/LoginForm';
import RegistrationForm from './components/authenticationSection/RegistrationForm';
import BlogForm from './components/BlogSection/BlogForm';
import Blogs from './components/BlogSection/Blogs';
import FriendsSection from './components/friendsSection/FriendsSection';
import TabSection from './components/TabSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
     <TabSection/>
      <Routes>
     <Route path='/' element={<Blogs/>}  />
     <Route path='/blog' element={<BlogForm/>} />
     <Route path='/friend' element={<FriendsSection/>} />
     <Route path='/login' element={<LoginForm/>} />
     <Route path='/register' element={<RegistrationForm/>}/>
     </Routes>
    </div>
  );
}

export default App;
