import React from 'react'

import './home.css'
// import home_bg from '../assets/home_bg.png'
import banner from '../assets/banner-removebg-preview.png'
import PatientDetails from '../components/PatientDetails'
import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <body>
    <Navbar />
    <div className="firstheader">
    <figure className="second">
    <img className='' src={banner} alt="home-page"/>
     <h1 className="third"> 
        <span className="fourth-a">
        Welcome to Care Connect Portal
        <br />
        <br />
        <span className="fourth-b"> DevelopHers</span>
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
    </body>
  )
}

export default Home
