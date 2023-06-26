import {React, useState} from 'react'
import './Login.css'
const Login = () => {

  return (
    <form className="Login" >
    <h3>Log In</h3>
    
    <label>Email address:</label>
    <input 
      type="email" 
     
   
    />
    <label>Password:</label>
    <input 
      type="password" 
      
    />

    <button>Log in</button>
    {/* {error && <div className="error">{error}</div>} */}
  </form>
  )
}

export default Login
