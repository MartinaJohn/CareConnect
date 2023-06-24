import React from 'react'
import './Navbar.css'
const Navbar = () => {
 
    return (
        <nav className="navigation">
          <a href="/" className="brand-name">
            CARE CONNECT🏥
          </a>
          
          <div
            className="navigation-menu">
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
  )
}

export default Navbar
