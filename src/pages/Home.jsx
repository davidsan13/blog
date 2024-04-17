import { useState, useEffect, React} from 'react'
import { useParams } from 'react-router-dom'
import Blogs from '../components/Blogs'

const Home = ({blogs}) => {
  const url = 'http://localhost:3005/blog'
  const method = 'GET'
  // const blogsData = <Blogs blogs={blogs}/>
  const filterBlogs = blogs.slice(0,4)
  // console.log(blogsData.typeof())
  // const blogs4 = blogsData.props.blogs.slice(0,4)
  // const d = blogsData.slice(0,4)
  return  (
    <div className="blogs">
      <div className='heading-container'>
        <h1>Hi! Welcome to my blog</h1>
      </div>
      <Blogs blogs={filterBlogs}/>
      {/* <Blogs blogs={blogs}/> */}
      <a href='/blog/allBlogs'> <h2>More Blogs</h2> </a>
      <a href='/blog/createblog'> <h2>Create</h2> </a>
      <a href='/blog/login'> <h2>Login</h2> </a>

    </div>
  )
}

export default Home