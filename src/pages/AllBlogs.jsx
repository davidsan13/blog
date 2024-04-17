import { useState, useEffect, React} from 'react'
import { useParams } from 'react-router-dom'
import Blogs from '../components/Blogs'

const AllBlogs = ({blogs}) => {

  return (
    <Blogs blogs={blogs}/>
  )
} 

export default AllBlogs