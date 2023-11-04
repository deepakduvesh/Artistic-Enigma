import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import './LoginSignup.css'

import user_icon from './Assets/profile.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
      position: "bottom-right",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/signup",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
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
        username: "",
      });
    };
  
    return (
      <div className="container">
        {/* for header */}
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>

     
        <form onSubmit={handleSubmit}>
        <div className="inputs">
        <div className="input">
        <img src={user_icon} alt=""/>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Name"
            onChange={handleOnChange}
          />
        </div>
          <div className="input">
          <img src={email_icon} alt=""/>
          
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
       
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>

        </div>

        <div className="forgot-password">Lost Password? <span>click here!</span></div>

        <div className="submit-container">
        <button className="submit" type="submit">SignUp</button>
       
        <span>
         <button className="submit gray" ><Link to ="/login">login </Link>  </button>
    
        </span>
        </div>
        

      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;