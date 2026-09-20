import { useContext } from 'react'
import { AuthorContext } from '../context/author-context'

export function useAuthor() {
  return useContext(AuthorContext)
}
