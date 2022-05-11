import React from 'react'
import Navbar from '../components/Navbar'

function HomePage() {
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