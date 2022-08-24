import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtnLink, NavBtn } from './NavbarElements';


const navigate =useNavigate
const Navbar = () => {
    const [user,setUser]= useState("")

  useEffect(() => {
  let userInfo = localStorage.getItem('userInfo')
  if(userInfo){
    setUser(JSON.parse(userInfo) )
  }
  },[])
  const logout =()=>{
    localStorage.removeItem("userInfo")
    navigate('/')
  }
    
    return (
        
            <Nav>
                <NavLink to="/">
                    <h1>AK Cinemas</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/services" activeStyle>
                        Services
                    </NavLink>

                    <NavLink to="/contact" activeStyle>
                        Contact Us
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        {user ? user.name : "" }
                    </NavLink>

                    <NavBtn >
                       {user ?  <NavBtnLink onClick={logout} to='/'>
                            Logout 
                        </NavBtnLink>  : <NavBtnLink to="/login">
                            Login
                        </NavBtnLink>
                        
                        }
                        
                    </NavBtn>
                </NavMenu>
            </Nav>

        
    )
}

export default Navbar;