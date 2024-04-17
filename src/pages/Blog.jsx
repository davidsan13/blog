import { useState, useEffect, React} from 'react'
import { useLocation } from 'react-router-dom'
import GetData from '../components/Api'
import Comment from '../components/Comment'
const Blog = (props) => {
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([])
  let {state} = useLocation()
  // let {blogData} = location 

  useEffect(() => {
    setBlog(state)
    console.log(blog)
    let url = `http://localhost:3005/blog/${state._id}/`

    GetData(url, 'GET')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setComments(data.comments)
        console.log(data)
      })
  }, []);
  // console.log(blog.comments)
  // const {id} = useParams()
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
  }
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
      <div className='comments-container'>
        <Comment/>
        {allComments}
      </div>
    </div>

  return (
    <>
      {blogView}
    </>
  )
}

export default Blog