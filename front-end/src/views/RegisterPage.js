import React from 'react'
import Navbar from '../components/Navbar'
import "../App.css"
import { selectUser, addusername, addemail, addpassword, addbio, addprofileimg, addfriends, addrequests } from '../features/user/userSlice'
import {useSelector,useDispatch} from "react-redux"
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

function RegisterPage() {
  const userstore = useSelector(selectUser)
  const dispatch = useDispatch()
  const [username, addUserName] = useState("")
  const [password,addPassword] = useState("")
  const [email,setEmail] = useState("")


  useEffect(() => 
  {
      if (userstore.username !== null){
        window.location.href = "http://localhost:3000/browse"
      }else{

      }
  })

  function handleChangeUsername(e){
      addUserName(e.target.value)
  }
  function handleChangePassword(e){
      addPassword(e.target.value)
  }
  function handleChangeEmail(e){
      setEmail(e.target.value)
  }
  function handleSubmit(e){
      e.preventDefault()
      const requestOptions = {
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({
            username:username,
            password:password,
            email:email,
        }),
      }
      if(username === ""){
          return;
      }
      if(email === ""){
          return;
      }
      if(password === ""){
          return;
      }
      else{
        fetch("http://127.0.0.1:8000/api/signup",requestOptions).then(function(response){
            return response.json()
        }).then((data) => {
            let user = data
            dispatch(addusername(user.username))
            dispatch(addemail(user.email))
            dispatch(addpassword(user.password))
            dispatch(addbio(user.bio))
            dispatch(addprofileimg(user.profileimg))
            dispatch(addfriends(user.friends))
            dispatch(addrequests(user.requests))
            console.log(userstore)
            window.location.href = "http://localhost:3000/browse"
        })
      }
  }
  return (
    <div>
        <Navbar/>
        <div className='logincontent'>
            <div class="login-box">
                <h2>Register</h2>
                <form>
                    <div className='user-box'>
                        <input type="text" value={username} onChange={handleChangeUsername} name="" required=""/>
                        <label>Username</label>
                    </div>
                    <div className='user-box'>
                        <input type="email" value={email} onChange={handleChangeEmail} name="" required=""/>
                        <label>Email</label>
                    </div>
                    <div className='user-box'>
                        <input type="password" value={password} onChange={handleChangePassword} name="" required=""/>
                        <label>Password</label>
                    </div>
                    <button onClick={handleSubmit} href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form>
            </div>
            <div className='login-txt'>
                <h1 className='heading'>We are excited to have you onboard</h1>
                <ol className='subtxt'>
                    <h1>meet Teenagers like you</h1>
                    <h1>make friends</h1>
                    <h1>share your life with others</h1>
                </ol>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage