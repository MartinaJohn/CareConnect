import React from 'react'
import "./Signup.css"
const Signup = () => {
  return (
    <div>
      <form className="signup" >
            <h3>Signup</h3>
            <label>Email address: </label>
            <input
            type="email"
                
            />

            <label>Password:</label>
            <input
            type="password"
           
            />

            <button>Sign up</button>
           
        </form>

    </div>
  )
}

export default Signup
