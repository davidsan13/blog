import React from 'react'
import { useParams } from 'react-router-dom'



const Blog = () => {
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

  const filterBlog = blogs.find(blog => 
    blog.id === parseInt(id))
  // console.log(blogs.find(blog => blog.id === parseInt(id)))


  const blog = <h1 key={filterBlog.id}>{filterBlog.content}</h1>
  return (
    <>
      <h1>Single Blog</h1>
      {blog}
    </>
  )
}

export default Blog