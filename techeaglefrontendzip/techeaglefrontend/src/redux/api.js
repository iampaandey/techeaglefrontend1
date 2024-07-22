import axios from 'axios';

const API=axios.create({baseURL: 'https://techeaglebackend-1.onrender.com'});

export const register=(formData)=>{
    return API.post('/register',formData);
}


export const login=(formData)=>{
    return API.post('/login',formData)
}

export const getBlogs=()=>{
    return API.get('/blog')
}

export const getFriends=()=>{
    return API.get('/friends');
}


export const getmyfriends=()=>{
    const token = localStorage?.getItem('token');  
    return API.get('/myfriends',{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
          
    })
}

export const addBlogApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.post('/blog',formData,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
    })
}        


export const getmyuserinfo=()=>{
    const token = localStorage?.getItem('token');  
    return API.get('/user',{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },       
    })
}

export const addfriend=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.post('/friends',formData,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },       
    })
}
export const likeApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.post('/like',formData,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },     
    })
}
export const addCommentApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.post('/comment',formData,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },     
    })
}


