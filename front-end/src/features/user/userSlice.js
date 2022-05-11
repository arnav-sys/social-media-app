import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: 'idle',
  password:"",
  bio:"",
  profileimg:"",
  friends:"",
  requests:"",
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addusername:(state,action) => {
            state.username = action.payload
        },
        addemail:(state,action) => {
            state.email = action.payload
        },
        addpassword:(state,action) => {
            state.password = action.payload
        },
        addbio:(state,action) => {
            state.bio = action.payload
        },
        addprofileimg:(state,action) => {
            state.profileimg = action.payload
        },
        addfriends:(state,action) => {
            state.friends = action.payload
        },
        addrequests:(state,action) => {
            state.requests = action.payload
        },
    }
})

export const {addusername,addemail,addpassword,addbio,addprofileimg,addfriends,addrequests} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;