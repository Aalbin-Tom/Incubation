import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtnLink, NavBtn } from './NavbarElements';


const navigate =useNavigate
const AdminNav = () => {
    const [user,setUser]= useState("")

  useEffect(() => {
  let adminInfo = localStorage.getItem('adminInfo')
  if(adminInfo){
    setUser(JSON.parse(adminInfo) )
  }
  },[])
  const logout =()=>{
    localStorage.removeItem("adminInfo")
    navigate('/admin')
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
                       {user ?  <NavBtnLink onClick={logout} to='/admin/login'>
                            Logout 
                        </NavBtnLink>  : <NavBtnLink to="/admin/login">
                            Login
                        </NavBtnLink>
                        
                        }
                        
                    </NavBtn>
                </NavMenu>
            </Nav>

        
    )
}

export default AdminNav;