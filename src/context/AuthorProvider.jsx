import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { AuthorContext } from './author-context'

/** Loads the blog owner's public profile once so the whole site can show their name and links. */
export function AuthorProvider({ children }) {
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    api
      .getAuthor({ signal: controller.signal })
      .then(setAuthor)
      .catch((err) => {
        if (err.name !== 'AbortError') setAuthor(null)
      })
    return () => controller.abort()
  }, [])

  return <AuthorContext.Provider value={author}>{children}</AuthorContext.Provider>
}
