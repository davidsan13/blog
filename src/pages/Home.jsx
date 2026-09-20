import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { sortByNewest } from '../lib/format'
import { useFetch } from '../hooks/useFetch'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PostList from '../components/PostList'
import { ErrorMessage, Loading } from '../components/Status'

export default function Home() {
  useDocumentTitle()
  const { data, error, loading, reload } = useFetch((opts) => api.getLatest(opts), [])

  return (
    <>
      <section className="hero">
        <h1>Hi, I&rsquo;m David.</h1>
        <p>Notes on software, cloud, and learning in public.</p>
      </section>

      <section aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="section-title">
          Latest posts
        </h2>
        {loading && <Loading />}
        {error && <ErrorMessage error={error} onRetry={reload} />}
        {data && <PostList posts={sortByNewest(data).slice(0, 4)} />}
        <p className="more">
          <Link to="/blog/allBlogs">Browse all posts →</Link>
        </p>
      </section>
    </>
  )
}
