import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <header>
        <nav>
          <h1>
            <Link to='/'>Blog</Link>
          </h1>
        </nav>
      </header>
    </>
  )
}

export default NavBar