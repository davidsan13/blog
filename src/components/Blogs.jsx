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
    // <div key={blog.id} className="blog-card">
    //   <Link to={{pathname: `/blog/${blog.id}`}}>{blog.title}</Link>
    // </div>
    <article key={blog.id}>
      <div className="article-wrapper">
        <figure>
          <img src="#" alt="" />
        </figure>
        <div className="article-body">
          <h2>{blog.title}</h2>
          <p>
            {blog.content}
          </p>
          <Link className='read-more' to={{pathname: `/blog/${blog.id}`}}>
            Read more <span className="sr-only">about this is some title</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>  
          </Link>
        </div>
      </div>
    </article>
  )
 
  return (
    <>
      <h1>Hello, Welcome to page</h1>
      
      <div className='blog-container'>
        {allBlogs}
      </div>
      
    </>
  )
}

export default Blogs