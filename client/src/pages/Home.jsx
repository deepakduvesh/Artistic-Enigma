import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Home.css";
//import { ToastContainer, toast } from "react-toastify";
// import Logo from './Assets/logo.png'

import {toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>

<nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          {/* <img src="logo.png" alt="Logo" /> */}
          {/* <img src={Logo} alt="" /> */}
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
        <div className="auth-buttons">
          <a href="#signup">Sign Up</a>
          <a href="#signin">Sign In</a>
        </div>
      </div>
    </nav>
    <section className="intro">
            <center><p>Welcome to Artistic Enigma <span>{username}</span></p></center>
            <center><h1>Showcase your Intelligence</h1></center>
            <button onClick={Logout}>LOGOUT</button>
           
    </section>
    </>


      // <div className="home_page">
      //   <h4>
      //     {" "}
      //     Welcome <span>{username}</span>
      //   </h4>
      //   <button onClick={Logout}>LOGOUT</button>
      // </div>
     // <ToastContainer />
   // </>
  );
};

export default Home;