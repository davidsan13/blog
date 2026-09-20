import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Not found')
  const error = useRouteError()
  const unexpected = error && !isRouteErrorResponse(error)
  return (
    <section className="hero">
      <h1>{unexpected ? 'Something broke' : 'Page not found'}</h1>
      <p>{unexpected ? 'An unexpected error occurred.' : "That page doesn't exist."}</p>
      <p className="more">
        <Link to="/">Back home →</Link>
      </p>
    </section>
  )
}
