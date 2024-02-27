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
    <div className="blog-card">
      <Link key={blog.id} to={{pathname: `/blog/${blog.id}`}}>{blog.title}</Link>
    </div> 
  )
 
  return (
    <>
      <h1>Hello, Welcome to my blog page</h1>
      
      <div className='blog-container'>
        {allBlogs}
      </div>
      
    </>
  )
}

export default Blogs