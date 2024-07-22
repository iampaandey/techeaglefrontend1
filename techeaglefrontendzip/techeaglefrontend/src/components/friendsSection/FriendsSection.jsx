import { useEffect, useState } from "react";
import FriendsList from "./friendList/FriendsList";
import FriendSearch from "./searchBar/FriendSearch";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsThunk, getMyFriendsThunk, getUserInfoThunk } from "../../redux/features/friendSlice";
import Loading from "../loaders/Loading";
import {useNavigate} from 'react-router-dom'

const FriendsSection = () => {
    const [friendss, setFriendss] = useState([]);
    const [friendList, setFriendList] = useState([]);
   

    const dispatch=useDispatch();
    
    const {data, loading, friends, user, friendRequest}= useSelector((state)=>({...state.friend}))

   const navigate =useNavigate()
    useEffect(()=>{
     dispatch(getFriendsThunk());
     if(localStorage.getItem('token')){
      dispatch(getMyFriendsThunk());
      dispatch(getUserInfoThunk());
     }
     else{
      navigate('/login')
     }
    },[])
   
    useEffect(()=>{
      dispatch(getFriendsThunk());
      dispatch(getMyFriendsThunk());
    },[friendRequest])

    useEffect(()=>{
     if(data){
      setFriendss(data);
     }
     if(friends){
      setFriendList(friends);
     }
     if(user){
      localStorage.setItem('user',JSON.stringify(user))
     }
    },[data,friends,user])
  return (
    <>
   { loading ? <Loading/> :
      <>
      
    <div className="min-h-screen flex flex-col items-center p-4 font-sans">
    <h1 className="text-xl font-semibold mb-6">Find Friends</h1>
    <FriendSearch friends={friendss} friendslist={friendList} />
    <FriendsList friends={friendList} />
  </div>
  </>
}
</>
  )
}

export default FriendsSection
