import React from 'react'
import { useState } from 'react';
import './LoginSignup.css'

import user_icon from '../Assets/profile.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { Link } from 'react-router-dom';

import {  Route, Routes,  BrowserRouter } from 'react-router-dom';

const LoginSignup = () => {
  return (
     <div className="container">
      {/* for header */}
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

    {/* for inputs like name, mail, pass */}
    <form action="">
      <div className="inputs">
        
        <div className="input">
          <img src={email_icon} alt=""/>
          <input type="email" placeholder="Email"/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password"/>
        </div>
      </div>
       
      <div className="forgot-password">Lost Password? <span>click here!</span></div>

      <div className="submit-container">
        <button className="submit gray" ><Link to ="/Signup">SignUp</Link></button>
          <button className="submit" type='submit'>Login</button>
      </div>
      </form>
     </div>
  )
}
export default LoginSignup;
