import { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'

function Blogs() {
  const blogs = [
    {
      'id': 1,
      'title':'This is my first blog post',
      'content': `Welcome to my blog page, This first post will be an introdution 
      about my pages `, 
      'published': true,
    },
    {
      'id': 2,
      'title':'Second blog post',
      'content': `My second blog post, and I am going to be talking about HRV `, 
      'published': true,
    }
  ]

  const allBlogs = blogs.map((blog) => 
    <Link key={blog.id} to={{pathname: `/blog/${blog.id}`}}>{blog.title}</Link>
  )
  console.log(blogs)
  return (
    <>
      <h1> All Blogs</h1>
      
      <div className='blog-container'>
        {allBlogs}
      </div>
      
    </>
  )
}

export default Blogs