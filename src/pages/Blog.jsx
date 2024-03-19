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
      
  const {id} = useParams()

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  const date = formatDate(blog.publishedAt)
  const blogView = <div className="blog" key={blog._id}>
    <h1 className='blog-title'>{blog.title}</h1>
    <h2 className='blog-date'>{date}</h2>
    <p className='blog-content'>{blog.content}</p>
  </div>
  return (
    <>
      {blogView}
    </>
  )
}

export default Blog