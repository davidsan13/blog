import PostCard from './PostCard'

export default function PostList({ posts, emptyMessage = 'No posts yet.' }) {
  if (!posts.length) return <p className="status">{emptyMessage}</p>
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
