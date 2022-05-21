import { IconButton } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function EditPostPage() {
  const [image,setimage] = useState("")
  const [caption,setCaption] = useState("")

  let { id } = useParams()



  function handlesubmit(e){
      e.preventDefault()
      let body = new FormData()
      body.append("img",image)
      body.append("caption",caption)
      body.append("id",id)
      axios.put("http://localhost:8000/api/update-post",body).then(function(response){
          console.log(response)
          window.location.href="http://localhost:3000/profile"
      })
  }

  function handleimage(e){
      setimage(e.target.value)
  }

  function handlecaption(e){
      setCaption(e.target.value)
  }

  function handledelete(e){
      e.preventDefault();

      axios.delete(`http://localhost:8000/api/delete-post/${id}`).then(function(response){
          console.log(response)
          window.location.href="http://localhost:3000/profile"
      })
  }
  return (
    <div>
    <Navbar/>
    <h1 className='maintxt-upd'>update-post</h1>
    <div className='update-div'>
        <form>
            <div>
            <label>caption</label>
            <input value={caption} onChange={handlecaption} className='update-in' placeholder=""></input>
            
            <label>image</label>
            <input value={image} onChange={handleimage} accept="image/*" className="img-input" id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
<IconButton color="primary" className="" component="span">
  <ImageOutlinedIcon/>
</IconButton>
</label>    
            </div>
            <button onClick={handlesubmit} className='update-sb' type="submit" value="Submit">edit post</button>
            <button onClick={handledelete} className='update-sb' type="submit" value="Submit">delete post</button>
            
        </form>
    </div>
</div>
  )
}

export default EditPostPage