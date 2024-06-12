import { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'

function Blogs({blogs}) {
  
  const allBlogs = blogs.map((blog) =>
    <article className='blog-article'key={blog._id}>
      <img src='https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'></img>
      <div className="blog-content">
        <h2>{blog.title}</h2>
        <p>
          {blog.content.substring(0, 50)}
        </p>
        <Link className='read-more' 
          to={{ pathname: `/blog/${blog._id}` }}
          state={blog}>          
          Read
        </Link>
      </div>
    </article>
  )
  return (
    <div className='blog-container'>
      {allBlogs}
    </div>
  )
}

export default Blogs