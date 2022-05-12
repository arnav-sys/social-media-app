import React from 'react'
import Navbar from '../components/Navbar'
import { selectUser } from '../features/user/userSlice'
import {useSelector} from "react-redux"

function BrowsePage() {
  const userstore = useSelector(selectUser)
  return (
    <div><Navbar/></div>
  )
}

export default BrowsePage