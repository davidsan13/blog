import { useState, useEffect, React} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import GetData from '../components/Api'
import Comment from '../components/Comment'
import formatDate from '../assets/utilities/helper'
const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([])
  let {state} = useLocation()

  useEffect(() => {
    setBlog(state)
    const getComment = () => {
      let url = `http://localhost:3005/blog/${state._id}/`

      GetData(url, 'GET')
        .then(res => {
          return res.json()
        })
        .then(data => {
          setComments(data.comments)
        })
    }
    getComment()
  },[state])
 



 
  const date = formatDate(blog.publishedAt)

  const allComments = comments.map((comment) =>
    <article className='comments-article' key={comment._id}>
      <h1 className='user-heading'>{comment.user}</h1>
      <h1 className='comment-date'>{formatDate(comment.createdTime)}</h1>
      <p className='comment-message'>{comment.message}</p>
    </article>
  )



  const blogView = 
    <div className="blog" key={blog._id}>
      <h1 className='blog-title'>{blog.title}</h1>
      <h2 className='blog-date'>{date}</h2>
      <p className='blog-content'>{blog.content}</p>
        <Comment/>
    </div>

  return (
    <>
      {blogView}
    </>
  )
}

export default Blog