import axios from 'axios'
import Swal from "sweetalert2"
import React, { useContext, useEffect, useState } from 'react'
import './addcompany.css'
import {  NavLink, useNavigate } from 'react-router-dom'

function Addcompany() {
     
  const navigate= useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [place,setPlace] = useState('')
  const [address,setAddress] = useState('')
  const [company,setCompany] = useState('')
  const [error,setError] = useState('')
  const [message,setMessages] = useState('')



    const handleSubmit = async (e) => {
    e.preventDefault();
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regEx.test(email)) {
      setMessages("")
    }else if (!regEx.test(email)) {
      setMessages("Email is not valid");
    }
    else {
        setMessages("")
    }
    if (name.length === 0 && !regEx.test(email) && email.length === 0  &&  address.length===0 &&  place.length===0 && phone.length===0 &&  company.length===0) {
      setError("true")
    }


        if( regEx.test(email) && name.length != 0 && email.length !=0 && phone.length !=0 &&  address.length !=0 &&  company.length !=0 &&  place.length !=0  ){
        
            try {
              Swal.fire({
  title: 'Are you sure',
  text: "You won't be able to Edit this!",
  showCancelButton: true,
  confirmButtonText: 'ADD'
}).then((result) => {
  if (result.isConfirmed) {
       const {data} =  axios.post('/add-company',{name,email,phone,place,address,company})
       
    Swal.fire(
      'Sucessfully Added',
      'Your data has been Added.',
      'success'
    ) 
     navigate('/')
  }

})  
                
            } catch (error) {
                
            }
      
        }
    }

    

  return (
    <div>
      <div className="centerDiv mt-5">
          <form>

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
            onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="name"
              defaultValue="John"
            />
            <br />
           <span>{error && name.length <= 0 ? 
               <label style={{ color: "red" }} >Name cannot be empty </label> : ""}</span><br/>


            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="text"
              value={email}
            onChange={(e)=>setEmail(e.target.value)}
              id="fname"
              name="email"
              defaultValue="John"
            />
            <br /><span>{error && email.length <= 0 ? 
               <label style={{ color: "red" }} >Email cannot be empty </label> : ""}</span><br/>
               {message ? <label style={{ color: "red" }}>{message}</label> : ""}
            
            <br />

                 <label htmlFor="fname">Place</label>
            <br />
            <input
              className="input"
              type="text"
              value={place}
            onChange={(e)=>setPlace(e.target.value)}
              id="fname"
              name="place"
              defaultValue="John"
              
            />
            <br />
           <span>{error && place.length <= 0 ? 
               <label style={{ color: "red" }} >Place cannot be empty </label> : ""}</span><br/>     


                <label htmlFor="fname">Address</label>
            <br />
            <input
              className="input"
              type="text"
              value={address}
            onChange={(e)=>setAddress(e.target.value)}
              id="fname"
              name="address"
              defaultValue="John"
            />
            <br />
           <span>{error && address.length <= 0 ? 
               <label style={{ color: "red" }} >Address cannot be empty </label> : ""}</span><br/>


            <label htmlFor="fname">Phone Number</label><br/>
            <input className="input" 
            type="number" 
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="fname" 
            name="phone" />
            <br />
            <span>{error && phone.length <= 0 ? <label style={{ color: "red" }} >Phone cannot be empty </label> : ""}</span><br/>


                   <label htmlFor="fname"> Company Name</label>
            <br />
            <input className="input" 
            type="text" 
            value={company}
            onChange={(e)=>setCompany(e.target.value)}
            id="fname" 
            name="company" />
            <br />
            <span>{error && company.length <= 0 ? 
               <label style={{ color: "red" }} >Company Name cannot be empty </label> : ""}</span><br/>
        {/*  </form>
          <br />
          <img name="image"  alt="Posts" width="200px" height="200px" src={image ?URL.createObjectURL(image)  : ''} ></img><br/>
           <span>{error && !image ? 
               <label style={{ color: "red" }} >Image cannot be empty </label> : ""}</span><br/>
          <form>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br /> */}
            <button onClick={handleSubmit} className="uploadBtn"> Submit </button>
          </form>
        </div>

    </div>
  )
}

export default Addcompany
