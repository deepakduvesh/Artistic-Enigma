import React from 'react'
import "./Navbar.css";
 const Navbar = () => {
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
        <div className="auth-buttons">
          <a href="#signup">Sign Up</a>
          <a href="#signin">Sign In</a>
        </div>
      </div>
    </nav>
    <section className="intro">
            <center><p>Welcome to Artistic Enigma </p></center>
            <center><h1>Showcase your Intelligence</h1></center>
    </section>
    </>
  )
}

export default Navbar;