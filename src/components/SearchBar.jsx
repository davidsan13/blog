export default function SearchBar({ keyword, onChange }) {
  return (
    <div className="search">
      <label htmlFor="post-search" className="sr-only">
        Search posts
      </label>
      <input
        id="post-search"
        type="search"
        value={keyword}
        placeholder="Search posts…"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
