import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <>
      <header>
        <nav>
          <h1>
            <Link to='/'>Blog</Link>
          </h1>
          <input type='text' placeholder='Search...'/>
          
          {/* <ul>
            <li>
              <Link to='#'>Sign Up</Link>
            </li>
            <li>
              <a>
                Sign In
              </a>
            </li>
            <li>
              <a>
                Log Out
              </a>
            </li>
          </ul> */}
        </nav>
      </header>
    </>
  )
}

export default NavBar