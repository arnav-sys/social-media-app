import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/user/userSlice'
import "../App.css"

function ProfilePage() {
  const [posts,setPosts] = useState([])
  const user = useSelector(selectUser)



  useEffect(() => {
    axios.post("http://127.0.0.1:8000/api/postid",{
      "username":user.username
    }).then(function(response){
      setPosts(response.data)
    })
  })

  function edit(){
    window.location.href = "http://localhost:3000/update-profile"
  }


  
  return (
    <div>
        <Navbar/>
        <div className='maininfo'>
            <div className='info'>
                <img className="profile-img" src="https://image.shutterstock.com/z/stock-photo-the-word-link-and-serious-businessman-with-hands-on-hips-against-futuristic-black-and-blue-180015809.jpg"></img>
                <div className='maintxt'>
                <h2>{user.username}</h2>
                <h4 className='bio'>{user.bio}</h4>
                </div>
            </div>
            <button onClick={edit} className='editpf'>edit-profile</button>
        </div>
        <div className='posts'>
          <h1>My Posts</h1>
          <div className='container-pst'>
          {posts.map((value,index) => {
            
            return (
              <img className='' src="https://image.shutterstock.com/z/stock-photo-the-word-link-and-serious-businessman-with-hands-on-hips-against-futuristic-black-and-blue-180015809.jpg"/>
            )
          })}
          </div>

        </div>
    </div>
  )
}

export default ProfilePage