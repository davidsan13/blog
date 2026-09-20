import { createContext } from 'react'

// null until loaded, or when the blog has no author yet.
export const AuthorContext = createContext(null)
