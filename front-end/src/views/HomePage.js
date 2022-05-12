import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/user/userSlice'

function HomePage() {
  const userstore = useSelector(selectUser)
  useEffect(() => {
    if (userstore.username !== ""){
      window.location.href = "http://localhost:3000/browse"
    }else{
        console.log(userstore)
        window.location.href = "http://localhost:3000/browse"
    }
  })
  return (
    <div className='homepage'>
              <Navbar/>
      <div className='head'>      <div className='main-text'>
        <h1 className='heading'>The Only Social Media Platform For Teenagers who does not collect your data</h1>
        <h4 className='subheading'>A social media platform where users can post anything without ever worrying about their privacy. Users
can choose to see things based on their interest but not something of algorithm choice. Join us now</h4>
      </div>
       <h1 className='logo'>S</h1>
      </div>
      <a className='join-btn'>Join us now</a>
    </div>
  )
}

export default HomePage