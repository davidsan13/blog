import { Link } from 'react-router-dom'
import { excerpt, formatDate, readingTime } from '../lib/format'
import Thumb from './Thumb'

export default function PostCard({ post }) {
  const date = formatDate(post.publishedAt)
  return (
    <article className="card">
      <Thumb title={post.title} />
      <div className="card__body">
        <p className="meta">
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          {date && ' · '}
          {readingTime(post.content)} min read
        </p>
        <h2 className="card__title">
          <Link to={`/blog/${post._id}`}>{post.title}</Link>
        </h2>
        <p className="card__excerpt">{excerpt(post.content)}</p>
      </div>
    </article>
  )
}
