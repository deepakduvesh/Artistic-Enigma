import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import {toast } from "react-toastify";
import Cookies from "js-cookie";

const Home = () => {
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const t = sessionStorage.getItem('token')
  console.log("token : ",t);
  // console.log(ldata)'
  console.log(loginData)
  const navigate = useNavigate();
  const deleteCookie = ()=>{
    // if(token) Cookies.remove('token')
    // navigate("/")
    if(t){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loginData')
    } 
    navigate("/")
  }

  // const token = Cookies.get('token')
  return (
    <>

<nav className="navbar">
   
      <div className="navbar-container">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><Link to="/About" > About </Link></li>
          <li><Link to="/Contact" > Contact</Link></li>
          <li><Link to="/Services" > Services</Link></li>
        </ul>
        {
          t?
          (<div className="auth-buttons">
          <Link onClick={deleteCookie} to="/" > logout</Link>
            
            <Link to="/profile"> profile</Link>
          </div>
          ) 
          :(<div className="auth-buttons">
          <Link to="/signup" > sign up</Link>
            
            <Link to="/login"> sign in</Link>
          </div>)
        } 
        

        

      </div>
    </nav>
    <section className="intro">
            <center><p>Welcome to Artistic Enigma <span>{"Champ"}</span></p></center>
            <center><h1>Showcase your Intelligence</h1></center>
            <Link to="/Play">Play</Link>
            {/* <button onClick={Logout}>LOGOUT</button> */}
           
    </section>

      

    </>

  );
};

export default Home;