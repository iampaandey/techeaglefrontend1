import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api'

export const getFriendsThunk=createAsyncThunk("/getfriends",async(_,{rejectWithValue})=>{
    try {
        console.log("started fetching all users");
        const response= await api.getFriends();
        console.log(response.data);
        return response.data;
     } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
     }
})

export const getMyFriendsThunk=createAsyncThunk("/getmyfriends",async(formData,{rejectWithValue})=>{
    try {
        console.log("started fetching your friends");
        const response= await api.getmyfriends(formData);
        console.log(response.data);
        return response.data;
     } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
     }
})

export const getUserInfoThunk=createAsyncThunk("/getmyuserinfo",async(_,{rejectWithValue})=>{
    try {
        console.log("started fetching your user info");
        const response= await api.getmyuserinfo();
        console.log(response.data);
        return response.data;
     } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
     }
})

export const addFriendThunk=createAsyncThunk("/addfriend",async(formData,{rejectWithValue})=>{
    try {
        console.log("friend request sent");
        const response= await api.addfriend(formData);
        console.log(response.data);
        return response.data;
     } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
     }
})

export const resetFriendRequestThunk = createAsyncThunk('friend/resetFriendRequest', async (_, { dispatch }) => {
    dispatch(friendSlice.actions.resetFriendRequest());
});


const friendSlice=createSlice({
    name:'friend',
    initialState:{
       data:null,
       loading:false,
       error:null,
       friends:null,
       user:null,
       friendRequest:null
    },
    reducers:{
        resetFriendRequest: (state) => {
            state.friendRequest = null;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getFriendsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getFriendsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getFriendsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // for users friends

        .addCase(getMyFriendsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getMyFriendsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.friends = action.payload;
        })
        .addCase(getMyFriendsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // get userInfo
        .addCase(getUserInfoThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getUserInfoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getUserInfoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //for adding friend
        .addCase(addFriendThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(addFriendThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.friendRequest = action.payload;
        })
        .addCase(addFriendThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default friendSlice.reducer;