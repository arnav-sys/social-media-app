import "../styles.css"
import React from 'react'

function Navbar() {
  return (
<div class="topnav" id="myTopnav">
  <a href="#home" id="home" >S</a>
  <div className="side-btn">
  <a href="#news">login</a>
  <a href="#contact">join</a>
  </div>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>
  )
}

export default Navbar