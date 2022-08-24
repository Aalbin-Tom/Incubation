import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className='mid'>
        <div style={{fontSize:"55px"}}>   Book Your Movie Company   </div>
        <div>
         <NavLink to="/add-company"> <button  style={{background:"green", fontSize:"20px" }} >  REGISTER </button></NavLink>
        </div>
          
    </div>
  )
}

export default Home
