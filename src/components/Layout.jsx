import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import Icon from './Icons'
import { AuthorProvider } from '../context/AuthorProvider'
import { useAuthor } from '../hooks/useAuthor'

// Optional link to the separate admin site (blogAdmin).
const ADMIN_URL = import.meta.env.VITE_ADMIN_URL

function Shell() {
  const author = useAuthor()
  const name = author?.displayName ?? 'Blog'
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="container nav" aria-label="Main">
          <Link to="/" className="brand">
            {name}
            <span aria-hidden="true">.</span>
          </Link>
          <div className="nav__links">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/blog/allBlogs">All posts</NavLink>
          </div>
        </nav>
      </header>

      <main id="main" className="container main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer">
          <p>© {new Date().getFullYear()} {name}</p>
          <div className="footer__links">
            {author?.github && (
              <a href={author.github} aria-label={`${name} on GitHub`}>
                <Icon name="github" />
              </a>
            )}
            {author?.linkedin && (
              <a href={author.linkedin} aria-label={`${name} on LinkedIn`}>
                <Icon name="linkedin" />
              </a>
            )}
            {ADMIN_URL && (
              <a href={ADMIN_URL} className="footer__admin">
                Admin
              </a>
            )}
          </div>
        </div>
      </footer>
      <ScrollRestoration />
    </>
  )
}

export default function Layout() {
  return (
    <AuthorProvider>
      <Shell />
    </AuthorProvider>
  )
}
