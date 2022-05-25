import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/user/userSlice'

function FriendPage() {
  const user = useSelector(selectUser)
  let new_user = {}
  const [requests,setRequests] = useState([])
  const [friends,setFriends] = useState([])
  let loading = true

  function loaddata(){
    axios.post("http://127.0.0.1:8000/api/login",{
      username:user.username,
      password:user.password
  }).then(function(response){
      new_user = response.data[0].fields
      setRequests(new_user.requests.split(","))
      setFriends(new_user.friends.split(","))
      loading = false
  })
  }


  return (
    <div><Navbar/>
    <div>
      <h1>Requests and Friends</h1>  
      <h2>requests</h2>
      {loaddata()}
      {requests.map((value) => {
          function addfriend(){
            axios.post("http://127.0.0.1:8000/api/create-friend",{
              username:user.username,
              friends:value
            }).then(function(response){
              console.log(response)
              removerequest()
            })
          }
        
          function removerequest(){
            axios.post("http://127.0.0.1:8000/api/remove-request",{
              username:user.username,
              requests:value
            }).then(function(response){
              console.log(response)
              loaddata()
            })
          }
          
        
        if (value !== ""){
          return <div className='request-box'><h3 className='request-name'>{value}</h3><button id="request-btn" onClick={addfriend} className=''>add-friend</button><button id="request-btn" onClick={removerequest} className=''>remove-request</button></div>
        }else{
          return;
        }
      })}
      <h2>friends</h2>
      {console.log(friends)}
      {console.log(requests)}
      {friends == {}?<h1>no friends</h1>:friends.map((value) => {
        console.log(value)
          function removefriend(){
            axios.post("http://127.0.0.1:8000/api/remove-friend",{
              username:user.username,
              friends:value
            }).then(function(response){
              console.log(response)
              loaddata()
            })
          }
          
        
        if (value !== ""){
          return <div className='request-box'><h3 className='request-name'>{value}</h3> <button id="request-btn" onClick={removefriend} className=''>remove-friend</button></div>
        }else{
          return;
        }
      })}


    </div></div>
  )
}

export default FriendPage