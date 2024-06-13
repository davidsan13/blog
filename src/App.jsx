import { useState, useEffect } from 'react'
import './App.scss'
import Router from './components/Routes'
import GetData from './components/Api'
function App() {
  const [blogs, setBlogs] = useState([]);
  const url = 'http://localhost:3005/blog/allBlogs'

  useEffect(() => {
    GetData(url, 'GET')
      .then((res) => {
        return res.json()
      })
      .then(data => {
        setBlogs(data)
      })
  }, [])
  return (
    <>
      <Router blogs={blogs}/>
    </>
  )
}

export default App
