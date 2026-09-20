import { useMemo, useState } from 'react'
import { api } from '../lib/api'
import { sortByNewest, toPlainText } from '../lib/format'
import { useFetch } from '../hooks/useFetch'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PostList from '../components/PostList'
import SearchBar from '../components/SearchBar'
import { ErrorMessage, Loading } from '../components/Status'

export default function AllBlogs() {
  useDocumentTitle('All posts')
  const { data, error, loading, reload } = useFetch((opts) => api.getPosts(opts), [])
  const [keyword, setKeyword] = useState('')

  const posts = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    const sorted = sortByNewest(data ?? [])
    if (!q) return sorted
    return sorted.filter(
      (p) => p.title?.toLowerCase().includes(q) || toPlainText(p.content).toLowerCase().includes(q),
    )
  }, [data, keyword])

  return (
    <>
      <h1 className="page-title">All posts</h1>
      <SearchBar keyword={keyword} onChange={setKeyword} />
      {loading && <Loading />}
      {error && <ErrorMessage error={error} onRetry={reload} />}
      {data && (
        <PostList posts={posts} emptyMessage={keyword ? `No posts match “${keyword}”.` : 'No posts yet.'} />
      )}
    </>
  )
}
