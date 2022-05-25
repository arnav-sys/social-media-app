import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from "axios"
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'

function UserPage() {
    const [posts,setPosts] = useState([])
    const [con,setCon] = useState(false)
    const [user,setUser] = useState({})
    const mainuser = useSelector(selectUser)

    let { name } = useParams();
  
    useEffect(() => {
      axios.post("http://127.0.0.1:8000/api/userid",{
            "username":name
          }).then(function(response){
            setUser(response.data)
          })
      axios.post("http://127.0.0.1:8000/api/postid",{
        "username":name
      }).then(function(response){
        setPosts(response.data)
      })
    })
  
    function connect(){
      axios.post("http://127.0.0.1:8000/api/create-request",{
          "requests":mainuser.username,
          "username":name,
      }).then(function(response){
          console.log(response)
          setCon(true)
      })
    }
    
    function renderconnectbtn(){
        if(con==true){
            return (<button className='editpf'>pending</button>)
        }else{
            return (<button onClick={connect} className='editpf'>connect</button>)
        }
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
              {renderconnectbtn()}
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

export default UserPage