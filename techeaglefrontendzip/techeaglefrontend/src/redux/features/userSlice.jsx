import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api'

export const loginThunk=createAsyncThunk("/login",async(formData,{rejectWithValue})=>{
    try {
        const response=await api.login(formData);
        console.log(response.data.token);
        return response.data.token;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
    }
})

export const registerThunk=createAsyncThunk("/register",async(formData,{rejectWithValue})=>{
    try {
        const response=await api.register(formData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
    }
})

export const resetErrorThunk = createAsyncThunk('user/resetError', async (_, { dispatch }) => {
    dispatch(userSlice.actions.resetError());
});

export const resetRegThunk = createAsyncThunk('user/resetReg', async (_, { dispatch }) => {
    dispatch(userSlice.actions.resetReg());
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        loading: false,
        error: null,
        registration:null
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        resetReg: (state) => {
            state.registration = null;
        }

    },
    extraReducers: (builder)=>{
        builder 
        // for login
        .addCase(loginThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // for registration
        .addCase(registerThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.registration = action.payload;
        })
        .addCase(registerThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer;