import React from 'react'

import './home.css'
import home_bg from '../assets/home_bg.png'
import PatientDetails from '../components/PatientDetails'
const Home = () => {
  return (
    <div className="firstheader">
    <figure className="second">
    <img className='' src={home_bg} alt="home-page"/>
     <h1 className="third"> 
        <span className='capitalize'>
        Welcome to Care Connect Portal
        <br />
        <br />
        <span className="fourth"> DevelopHers</span>
        <br />
        <br/>
        <div className="fifth">
        <button type='button' className="sixth" >Login</button>
        
        {/* <button type='button' className="seventh">Upload Details</button> */}
        
        </div>
        </span>
        
     </h1>
    </figure>
    </div>
  )
}

export default Home
