import { useState, useEffect } from "react";
import {useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

import './Login.css';


function Login() {
  const navigate = useNavigate()
  const initialValues = {  email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [usererror,setUsererror] = useState('')
  const [errors,setError] = useState(true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    try {
      // const config={
      //   headers:{
      //     "Contebt-type":"application/json"
      //   }
      // }
      if(!errors){
       const {data} = await axios.post('/login',formValues)
       console.log(data);
       localStorage.setItem('userInfo',JSON.stringify(data))
       navigate('/')
      }

    } catch (error) {
      setUsererror(error.response?.data.message)
      console.log(usererror);
    }
  };
useEffect(()=>{
  let user=localStorage.getItem('userInfo')
  if(user){
    navigate('/')
  }
},[])
  // useEffect(() => {
    
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
      setError(true)
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      setError(true)
    }else{
      setError(false)
    }
    if (!values.password) {
      errors.password = "Password is required";
      setError(true)
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      setError(true)
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
      setError(true)
    }else{
      setError(false)
    }
    return errors;
  };

  return (
    <div className="container">
        
      <form onSubmit={handleSubmit}>
              <h1>Login</h1>
        <div className="ui divider"></div>
        <div className="ui-form">
          <div >
           
       <span style={{color:"red"}}> {usererror}</span> <br/>
            {/* {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>} */}
            {/* <label>Username</label>
            <br/>
            <input
            className="text"
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div > */}
            <label>Email</label>
            <br/>
            <input
            className="text"
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p><br/>
          <div >
            <label>Password</label><br/>
            <input
            className="text"
              type="password"
              name="password"
              placeholder="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          
          <p>{formErrors.password}</p><br/>
          <button className="fluid ui button blue">Login</button>
        </div><br/>
        <h4 style={{color:"white"}}>Create New Account ?  <NavLink to='/signup'> Signup</NavLink></h4>

      </form>
    </div>
  );
}

export default Login;