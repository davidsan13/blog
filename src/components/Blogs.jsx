import { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/blog')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      });
  }, []);

  const blogss = [
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
    <article key={blog._id}>
      <h2>{blog.title}</h2>
      <p>
        {blog.content}
      </p>
      <Link className='read-more' to={{pathname: `/blog/${blog._id}`}}>              
      Read
      </Link>  
    </article>
  )
 
  return (
    <div className="blogs">
      <div className='heading-container'>
        <h1>Hello, Welcome to page</h1>
      </div>
      <div className='blog-container'>
        {allBlogs}
      </div>
      
    </div>
  )
}

export default Blogs