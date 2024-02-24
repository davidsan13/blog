import { useState, useEffect } from 'react'
import github from '../assets/images/github.png'
import linkedin from '../assets/images/linkedin.png'

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-link">
          <a href='https://github.com/davidsan13'>
            <img src={github}></img>
          </a>
          <a href='https://www.linkedin.com/in/davidsan13/'>
            <img src={linkedin}></img>
          </a>
        </div>
        
        <h1> Copyright</h1>
      </footer>
    </>
  )
}

export default Footer