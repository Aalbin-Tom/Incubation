import './Signup.css';
import React from 'react'
import {useState,useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios';
// import ErrorMessage from '../ErrorMessage';


function Signup() {
  const navigate = useNavigate()
    const initialValues = { name: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [errors, setError] =useState(true)
    const [usererror,setUsererror] = useState('')
    const [isSubmit, setIsSubmit] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      console.log("hiiiiiiiiiiiiiiiiiiiii");
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true); 
      
      try {
      // const config={
      //   headers:{
      //     "Contebt-type":"application/json"
      //   }
      // }
      console.log(errors);
      if(!errors){
        console.log(errors);
      //  const {data} = 
       await axios.post('/signup',formValues)
      //  localStorage.setItem('userInfo',JSON.stringify(data))
       navigate("/login")
      }
    } catch (error) {
       setUsererror(error.response.data.message)
       console.log(usererror);
    }
      
    };
      console.log(usererror);
  
    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
      }
    });
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.name) {
        errors.name = "Username is required!";
        setError(true)
      }else{
        setError(false)
      }
      if (!values.email) {
        errors.email = "Email is required!";
         setError(true)
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
         setError(true)
      }
      else{
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
              <h1>Signup</h1>
        <div className="ui-form">
          <div >
       <span style={{color:"red"}}> {usererror}</span>
            <br/>
            <label>Username</label>
            <br/>
            <input
            className="text"
              type="text"
              name="name"
              placeholder="name"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.name}</p><br/>
          <div >
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
          <button className="fluid ui button blue">Sign Up</button>
        </div><br/>
        {/* <NavLink to='/login'><button className="but"> Login</button></NavLink> */}
        <h4 style={{color:"white"}}>Login to Account ?  <NavLink to='/login'> Login</NavLink></h4>


      </form>
    </div>
  )
}

export default Signup
