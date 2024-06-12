import { useState, useEffect, React} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import GetData from '../components/Api'
import Comment from '../components/Comment'
import formatDate from '../assets/utilities/helper'
const Blog = () => {
  const [blog, setBlog] = useState([]);
  let {state} = useLocation()

  useEffect(() => {
    setBlog(state)
  
  },[state])
  
  const date = formatDate(blog.publishedAt)

  const blogView = 
    <div className="blog" key={blog._id}>
      <h1 className='blog-title'>{blog.title}</h1>
      <h2 className='blog-date'>{date}</h2>
      <p className='blog-content'>{blog.content}</p>
      <Comment/>
    </div>

  return (
    <>
      {blogView}
    </>
  )
}

export default Blog