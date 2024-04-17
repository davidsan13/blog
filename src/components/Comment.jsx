import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Comment = (props) => {
  const [user, setUser] = useState('')
  const [comment, setComment] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    addComment()
  }

  const addComment = () => {
    fetch('http://localhost:3005/admin/login', {
      method: 'POST',
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, comment }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          // localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
          // props.setLoggedIn(true)
          // props.setEmail(email)
          navigate('/')
        } else {
          window.alert('Wrong email or password')
        }
      })
  }
  return (
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
          value={comment}
          placeholder="Add a comment"
          onChange={(ev) => setComment(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Add Comment'} />
      </div>
    </div>
  )
}

export default Comment