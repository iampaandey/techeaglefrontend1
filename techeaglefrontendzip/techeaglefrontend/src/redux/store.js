
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import blogSlice from "./features/blogSlice";
import friendSlice from "./features/friendSlice";


export default configureStore({
    reducer:{
        user: userSlice,
        blog: blogSlice,
        friend: friendSlice
    }
})