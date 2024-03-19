import { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'

function Blogs({url}) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(url || 'http://localhost:3005/blog/allBlogs')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      });
  }, []);

  const allBlogs = blogs.map((blog) =>
    <article className='blog-article'key={blog._id}>
      <img placeholder="#"></img>
      <div className="blog-content">
        <h2>{blog.title}</h2>
        <p>
          {blog.content.substring(0, 75)}
        </p>
        <Link className='read-more' to={{pathname: `/blog/${blog._id}`}}>              
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