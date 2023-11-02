import React from 'react'
import { useState } from 'react';
import './LoginSignup.css'

import user_icon from '../Assets/profile.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

   const [action,setAction] = useState("Sign Up");

  return (
     <div className="container">
      {/* for header */}
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

    {/* for inputs like name, mail, pass */}
      <div className="inputs">
        {action==="Login"?<div></div>: <div className="input">
                                         <img src={user_icon} alt="" />
                                         <input type="text" placeholder="Name"/>
                                       </div>}
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email"/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password"/>
        </div>
      </div>
       
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>click here!</span></div>} 

      <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}} >SignUp</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} >Login</div>
      </div>

     </div>
  )
}
export default LoginSignup;
