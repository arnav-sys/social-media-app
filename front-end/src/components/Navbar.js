import "../App.css"
import React from 'react'
import { selectUser } from '../features/user/userSlice'
import {useSelector} from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const userstore = useSelector(selectUser)
  const [login,setLogin] = useState(false)
  useEffect(() => 
  {
      if (userstore.username == null){
        setLogin(false)
      }else{
        setLogin(true)
        console.log(userstore)
      }
  })
  function rendersidebtn(){
    if(login == true){
      return (<div className="side-btn">
        <Link to="/profile">Profile</Link>
        <Link to="/friends">My-Friends</Link>
      </div>)
    }else{
      return (<div className="side-btn">
        <a><Link to="/login">Login</Link></a>
        <a><Link to="/register">Join</Link></a>
      </div>)
    }
  }
  return (
<div class="topnav" id="myTopnav">
  <a href="#home" id="home" >S</a>
  {rendersidebtn()}
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>
  )
}

export default Navbar