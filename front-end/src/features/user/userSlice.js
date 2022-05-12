import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  password:localStorage.getItem("password"),
  bio:localStorage.getItem("bio"),
  profileimg:localStorage.getItem("profileimg"),
  friends:localStorage.getItem("friends"),
  requests:localStorage.getItem("requests"),
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addusername:(state,action) => {
            state.username = action.payload
            localStorage.setItem("username",action.payload)
        },
        addemail:(state,action) => {
            state.email = action.payload
            localStorage.setItem("email",action.payload)
        },
        addpassword:(state,action) => {
            state.password = action.payload
            localStorage.setItem("password",action.payload)
        },
        addbio:(state,action) => {
            state.bio = action.payload
            localStorage.setItem("bio",action.payload)
        },
        addprofileimg:(state,action) => {
            state.profileimg = action.payload
            localStorage.setItem("profileimg",action.payload)
        },
        addfriends:(state,action) => {
            state.friends = action.payload
            localStorage.setItem("friends",action.payload)
        },
        addrequests:(state,action) => {
            state.requests = action.payload
            localStorage.setItem("requests",action.payload)
        },
    }
})

export const {addusername,addemail,addpassword,addbio,addprofileimg,addfriends,addrequests} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;