import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GetData from '../components/Api'
import formatDate from '../assets/utilities/helper'
const Comment = (props) => {
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [updateComment, setUpdate] = useState(0)
  const [comments, setComments] = useState([])
  const params = useParams()
  const blogId = params.blogId
  // console.log(blogId)

  const navigate = useNavigate()

  const onButtonClick = () => {
    addComment()
  }

  useEffect(() => {
    const getComment = () => {
      let url = `http://localhost:3005/blog/${blogId}/`

      GetData(url, 'GET')
        .then(res => {
          return res.json()
        })
        .then(data => {
          setComments(data.comments)
        })
    }
    getComment()
  },[blogId, updateComment])
  const addComment = () => {
    fetch(`http://localhost:3005/blog/${blogId}/comment`, {
      method: 'POST',
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, message }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          console.log('message ' + r.message)
        } else {
          window.alert('Wrong email or password')
        }
      })
      setUpdate((v) => v+1)
  }
  const allComments = comments.map((comment) =>
    <article className='comments-article' key={comment._id}>
      <h1 className='user-heading'>{comment.user}</h1>
      <h1 className='comment-date'>{formatDate(comment.createdTime)}</h1>
      <p className='comment-message'>{comment.message}</p>
    </article>
  )
  return (
    <div className='comments-container'>

    <div className={'comment-form-container'}>
      <div className={'titleContainer'}>
        <div>Comments</div>
      </div>
      <div className={'inputContainer'}>
        <input
          value={user}
          placeholder="Enter a Username"
          onChange={(ev) => setUser(ev.target.value)}
          className={'inputBox user'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <div className={'inputContainer'}>
        <textarea
          rows="4"
          cols="50"
          value={message}
          placeholder="Add a comment"
          onChange={(ev) => setMessage(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Add Comment'} />
      </div>
    </div>
      {allComments}
    </div>
  )
}

export default Comment