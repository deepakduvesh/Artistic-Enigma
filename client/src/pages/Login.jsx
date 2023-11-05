import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './LoginSignup.css'
import user_icon from './Assets/profile.png'
import Cookies from 'js-cookie'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'



const Login = () => {
  
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(email==="" || password.length===""){
        toast.error("All fields are required",{
          position:"bottom-left"
        })
        return ;
      }
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        }
      );
      console.log(data);
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        Cookies.set('token',token,{expires: 10/(24*60)})
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
       {/* for header */}
       <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
 
      {/* for inputs like name, mail, pass */}
      <form onSubmit={handleSubmit}>
      <div className="inputs">
        <div className="input">
        <img src={email_icon} alt=""/>
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
          />
        </div>


        <div className="input">
        <img src={password_icon} alt="" />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>
        </div>

        {/* <button type="submit">Submit</button> */}

        <div className="forgot-password">
        Lost Password? <Link to={"/signup"}>Signup</Link>
          {/* Lost Password? <span>click here!</span> */}
          </div>

        <div className="submit-container">
        <button className="submit gray" ><Link to ="/Signup">SignUp</Link></button>
          <button className="submit" type='submit'>Login</button>
      </div>


        {/* <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span> */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
