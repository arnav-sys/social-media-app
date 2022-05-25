import React from 'react'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/user/userSlice'
import {useSelector} from "react-redux"
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { IconButton } from '@mui/material';
import axios from "axios"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useEffect } from 'react';
import { useState } from 'react';
import "../App.css"
import { Link } from 'react-router-dom';

function BrowsePage() {
  const userstore = useSelector(selectUser)
  const [posts,setPosts] = useState([])
  const [likes,setLike] = useState(true)
  const [img,setImg] = useState("")
  const [caption,setCaption] = useState("")
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/all-posts").then(function(response){
      setPosts(response.data)
    })
    axios.post("http://127.0.0.1:8000/api/login",{
      username:userstore.username,
      password:userstore.password
  }).then(function(response){
    console.log(response)
  })
  })

  function handlesubmit(e){
    e.preventDefault()
    let body = new FormData()
    body.append("img",img)
    body.append("caption",caption)
    axios({
      method: "put",
      url: "http://localhost:8000/api/create-post",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function(response){
      console.log(response)
    })
  }

  function handlecaption(e){
    setCaption(e.target.value)
  }

  function handleimg(e){
    setImg(e.target.value)
  }


  return (
    <div>
      <Navbar/>
      <form onSubmit={handlesubmit} className='input-pst'>
        <input className='txt' value={caption} onChange={handlecaption} type="text" placeholder='write a caption'></input>
        <input value={img} onChange={handleimg} accept="image/*" className="img-input" id="icon-button-file" type="file" />
  <label htmlFor="icon-button-file">
    <IconButton color="primary" className="" component="span">
      <ImageOutlinedIcon/>
    </IconButton>
  </label>
        <button onClick={handlesubmit}>submit</button>
      </form>
      <div className='posts'>
        {posts.map((value,index) => {

                function like(){
                  if(likes===true){
                    axios.post("http://127.0.0.1:8000/api/like-post",{id:value.id,m:"f"}).then(function(response){
                      console.log(response)
                      setLike(false)
                    })
                  }else{
                    axios.post("http://127.0.0.1:8000/api/like-post",{id:value.id,m:"t"}).then(function(response){
                      console.log(response)
                      setLike(true)
                    })
                  }
                }
                let url = "/user/" + value.username
                return (
                  <div className='post'>
                  <div className='content'>
                    <Link style={{color:"black"}} to={url}><h1>{value.username}</h1></Link>
                    <img className="post-img" src="data:image/jpeg;base64,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"></img>
                    <h3>{value.caption}</h3>
                  </div>
                  <div className='like'>
                  <ThumbUpIcon onClick={like} fontSize="large"/>
                  <h4>{value.likes}</h4>
                  </div>
                  
                </div>)
        })}
      </div>
    </div>
  )
}

export default BrowsePage