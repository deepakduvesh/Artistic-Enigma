import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Home.css";
import {toast } from "react-toastify";
import Cookies from "js-cookie";
const Home = () => {
  const navigate = useNavigate();
  const deleteCookie = ()=>{
    Cookies.remove('token')
    navigate("/")
  }
  const token = Cookies.get('token')
  return (
    <>

<nav className="navbar">
   
      <div className="navbar-container">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
        {
          token?(<button onClick={deleteCookie}>Logout</button>):(<div className="auth-buttons">
          <Link to="/signup"> sign up</Link>
            
            <Link to="/login"> sign in</Link>
          </div>)
        } 
        
      </div>
    </nav>
    <section className="intro">
            <center><p>Welcome to Artistic Enigma <span>{"Champ"}</span></p></center>
            <center><h1>Showcase your Intelligence</h1></center>
            {/* <button onClick={Logout}>LOGOUT</button> */}
           
    </section>
    </>

  );
};

export default Home;