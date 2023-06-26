import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
 
    return (
        <nav className="navigation">
        <Link to="/" className="brand-name">
        CARE CONNECT🏥
        </Link>
         
          <div
            className="navigation-menu">
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              {/* <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              */}
              <li>
                <a href="/about">About</a>
              </li>
              
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>

              <li>
                <a href="/details">Details-(will be protected)</a>
              </li>
            </ul>
            {/* <Link to="/login">
                Login
            </Link> */}
          </div>
        </nav>
  )
}

export default Navbar
