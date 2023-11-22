import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../Styles/LoginSignup.css'
import user_icon from '../Assets/profile.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Signup = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null)

  const handleFileChange = (event)=>{
    setPhoto(event.target.files[0]);
  }

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    cPassword:"",
    photo:""
  });
  const { email, password, username, cPassword } = inputValue;
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
        if(!photo){
          toast.error("please upload photo",{position:"bottom-right"})
          return ;
        }
        if(username.length<4 || password.length<4){
          toast.error("username and password length must be greater than 4",{position:"bottom-right"})
          return ;
        }
        if(password!==cPassword){
          toast.error("password and confirm password not matched",{position:"bottom-right"})
          return ;
        }
    const formData = new FormData();
    formData.append('photo', photo);
      formData.append('username', username); // Add other form fields to FormData
      formData.append('email', email);
      formData.append('password', password);
        const { data } = await axios.post("http://localhost:4000/signup",formData);

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
        cPassword:"",
        
      });
    };
  
    return (
      <div className="login-signup-container">
      <div className="container">
      {/* for header */}
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>

    {/* for inputs like name, mail, pass */}
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
            // type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>


        <div className="input">
          <img src={password_icon} alt="" />
         <input
            // type="cPassword"
            name="cPassword"
            value={cPassword}
            placeholder="Confirm Password"
            onChange={handleOnChange}
          />
        </div>

        <div className="input">
        
         <input
           type="file"
           name="file"
           placeholder="upload your photo"
           onChange={handleFileChange}
         />
        </div>

      </div>
       
      <div className="forgot-password">Lost Password? <span>click here!</span></div>

      <div className="submit-container">
        <button className="submit" type='submit' >SignUp </button>
          {/* <button className="submit gray" ><Link to ="/login">login </Link>  </button> */}
      </div>
      </form>
      <ToastContainer />
     </div>
     </div>
  );
};

export default Signup;