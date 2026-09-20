import { useState } from 'react'
import { api } from '../lib/api'
import { decode } from 'html-entities'
import { formatDate } from '../lib/format'

const MAX_MESSAGE = 1000 // limits mirror the API's validation
const MIN = 2

export default function Comments({ postId, comments = [], onPosted }) {
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const name = user.trim()
    const text = message.trim()
    if (name.length < MIN || text.length < MIN) return setError('Please add a name and a comment (at least 2 characters each).')
    if (text.length > MAX_MESSAGE) return setError(`Comments are limited to ${MAX_MESSAGE} characters.`)

    setSubmitting(true)
    setError('')
    try {
      await api.addComment(postId, { user: name, message: text })
      setMessage('')
      onPosted?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="comments" aria-labelledby="comments-heading">
      <h2 id="comments-heading">
        Comments <span className="count">{comments.length}</span>
      </h2>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="comment-user">Name</label>
        <input
          id="comment-user"
          value={user}
          maxLength={40}
          autoComplete="nickname"
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="comment-message">Comment</label>
        <textarea
          id="comment-message"
          rows="4"
          value={message}
          maxLength={MAX_MESSAGE}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Posting…' : 'Add comment'}
        </button>
      </form>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c._id} className="comment">
            <p className="comment__head">
              <strong>{decode(c.user)}</strong>
              <time dateTime={c.createdTime}>{formatDate(c.createdTime)}</time>
            </p>
            <p>{decode(c.message)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
