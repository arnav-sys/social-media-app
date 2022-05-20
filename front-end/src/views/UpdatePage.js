import React from 'react'
import Navbar from '../components/Navbar'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addbio, addpassword, addprofileimg, addusername, selectUser } from '../features/user/userSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function UpdatePage() {
  const user = useSelector(selectUser)
  const dispatch =useDispatch()
  const [username,setusername] = useState(user.username)
  const [image,setimage] = useState(user.image)
  const [bio,setbio] = useState(user.bio)
  const [password,setPassword] = useState(user.password)


  function handleimage(e){
      setimage(e.target.value)
  }

  function handlepassword(e){
      setPassword(e.target.value)
  }

  function handlebio(e){
      setbio(e.target.value)
  }

  function handlesubmit(e){
    e.preventDefault()
    let body = new FormData()
    body.append("file",image)
    body.append("bio",bio)
    body.append("username",username)
    body.append("password",password)
    body.append("email",user.email)
    axios({
      method: "put",
      url: "http://localhost:8000/api/update-profile",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function(response){
      console.log(response)
      dispatch(addusername(username))
      dispatch(addpassword(password))
      dispatch(addbio(bio))
      dispatch(addprofileimg(image))
    })
  }

  function handleusername(e){
      setusername(e.target.value)
  }
  return (
    <div>
        <Navbar/>
        <h1 className='maintxt-upd'>update-profile</h1>
        <div className='update-div'>
            <form>
                <label>username</label>
                <input value={username} onChange={handleusername} className='update-in' placeholder={user.username}></input>
                <label>bio</label>
                <input value={bio} onChange={handlebio} className='update-in' placeholder={user.bio}></input>
                <label>password</label>
                <input value={password} onChange={handlepassword} className='update-in' placeholder={user.password}></input>
                <div>
                <label>image</label>
                <input value={image} onChange={handleimage} accept="image/*" className="img-input" id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
    <IconButton color="primary" className="" component="span">
      <ImageOutlinedIcon/>
    </IconButton>
  </label>
                </div>
                <button onClick={handlesubmit} className='update-sb' type="submit" value="Submit">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UpdatePage