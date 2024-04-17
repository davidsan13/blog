import { useState, useEffect, React} from 'react'
import { useParams } from 'react-router-dom'
import Blogs from '../components/Blogs'
import GetData from '../components/Api'
import { useNavigate } from "react-router-dom";


const CreateBlog = () => {
  isAuth()
  const url = 'http://localhost:3005/admin/create'
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    GetData(url)
      .then((data) => {
        if(data.status === 401)
          navigate('/blog/login')
      })
    // fetch(url || 'http://localhost:3005/blog/allBlogs')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setBlogs(data);
    //   });
  }, []);
  return  (
    <div>
      <h1> Hello </h1>
      <h2>{message}</h2>
    </div>
  )
}

export default CreateBlog