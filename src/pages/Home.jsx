import { useState, useEffect, React} from 'react'
import { useParams } from 'react-router-dom'
import Blogs from '../components/Blogs'

const Home = ({blogs}) => {
  const filterBlogs = blogs.slice(0,4)

  return  (
    <div className="blogs">
      <div className='heading-container'>
        <h1>Hi! Welcome to my blog</h1>
      </div>
      <Blogs blogs={filterBlogs}/>
      <a href='/blog/allBlogs'> <h2>More Blogs</h2> </a>
    </div>
  )
}

export default Home