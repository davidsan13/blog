import { useEffect } from 'react'
import { useAuthor } from './useAuthor'

export function useDocumentTitle(title) {
  const site = useAuthor()?.displayName ?? 'Blog'
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · ${site}` : site
    return () => {
      document.title = previous
    }
  }, [title, site])
}
