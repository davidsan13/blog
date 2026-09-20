import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { formatDate, readingTime, sanitizeHtml } from '../lib/format'
import { useFetch } from '../hooks/useFetch'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Comments from '../components/Comments'
import { ErrorMessage, Loading } from '../components/Status'

export default function Blog() {
  const { blogId } = useParams()
  const { data, error, loading, reload } = useFetch(
    (opts) => api.getPost(blogId, opts),
    [blogId],
  )
  const post = data?.blog
  useDocumentTitle(post?.title)
  const html = useMemo(() => sanitizeHtml(post?.content), [post?.content])

  if (loading && !data) return <Loading />
  if (error) {
    return [400, 404, 500].includes(error.status) ? (
      <ErrorMessage error={{ message: 'That post could not be found.' }} />
    ) : (
      <ErrorMessage error={error} onRetry={reload} />
    )
  }
  if (!post) return <ErrorMessage error={{ message: 'That post could not be found.' }} />

  const date = formatDate(post.publishedAt)
  return (
    <article className="post">
      <Link to="/blog/allBlogs" className="back">
        ← All posts
      </Link>
      <h1 className="post__title">{post.title}</h1>
      <p className="meta">
        {date && <time dateTime={post.publishedAt}>{date}</time>}
        {date && ' · '}
        {readingTime(post.content)} min read
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      <Comments postId={blogId} comments={data.comments} onPosted={reload} />
    </article>
  )
}
