import { useEffect, useState } from "react"
import BlogCard from "../cards/BlogCard"
import { useDispatch, useSelector } from "react-redux";
import { getBlogsThunk } from "../../redux/features/blogSlice";
import Loading from "../loaders/Loading";

const Blogs = () => {

   const [blogData,setBlogData]=useState();
   const dispatch=useDispatch();
   const {data,loading}=useSelector((state)=>({...state.blog}));

   useEffect(()=>{
   console.log("request dispatched for fetching blogs")
   dispatch(getBlogsThunk());
   },[])
   
  useEffect(()=>{
  if(data){
    setBlogData(data);
  }
  },[data])
  return (
    <>
     {
      loading ? <Loading/> :  
        <>
      <div className="main-Section-blogs m-4">
      {
        blogData?.map((e)=>{
         return <BlogCard comments={e?.comments} likes={e?.likes}  blogId={e?._id} key={e?._id} count={e?.likes?.length} image={e?.image} video={e?.video} username={e?.author.username} location={e?.location} title={e?.title}  description={e?.description} timestamp={e?.createdAt}   />
        })
      }
      </div>
      </>
     }
    </>
  )
}

export default Blogs;