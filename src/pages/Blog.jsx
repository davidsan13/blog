import { useState, useEffect, React, createElement} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import GetData from '../components/Api'
import Comment from '../components/Comment'
import formatDate from '../assets/utilities/helper'
import { decode } from 'html-entities'
const Blog = () => {
  const [blog, setBlog] = useState([]);
  let {state} = useLocation()

  useEffect(() => {
    setBlog(state)
  
  },[state])
  
  const date = formatDate(blog.publishedAt)
  const renderHTML = (rawHTML) => createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML }, className: "blog-content" });

  const blogView = 
    <div className="blog" key={blog._id}>
      <h1 className='blog-title'>{blog.title}</h1>
      <h2 className='blog-date'>{date}</h2>
    
      {renderHTML(decode(blog.content))}
      <Comment/>

    </div>

  return (
    <>
      {blogView}
    </>
  )
}

export default Blog