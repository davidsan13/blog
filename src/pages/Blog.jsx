import { useState, useEffect, React} from 'react'
import { useParams } from 'react-router-dom'



const Blog = () => {
  const [blog, setBlog] = useState([]);
  const {blogId} = useParams()
  useEffect(() => {
    fetch(`http://localhost:3005/blog/${blogId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.blog);
        setBlog(data.blog);
      });
  }, []);

  console.log(blog.content)
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
  const {id} = useParams()

  // const filterBlog = blogs.find(blog => 
  //   blog.id === parseInt(id))
  // console.log(blogs.find(blog => blog.id === parseInt(id)))


  const blogView = <h1 key={blog._id}>{blog.content}</h1>
  return (
    <>
      <h1>Single Blog</h1>
      {blogView}
    </>
  )
}

export default Blog