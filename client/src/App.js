import React from 'react'
import './App.css';
// import  LoginSignup  from './Components/LoginSignup/LoginSignup.jsx';
import  Signup  from './Components/LoginSignup/Signup.js';
import  Login  from './Components/LoginSignup/Login.js';
import { Link } from "react-router-dom";
// import Profile from './Profile.js';
import Navbar from './Components/Navbar/Navbar.js'
import MyAccount from './Components/MyAccount/MyAccount.js'
import {  Route, Routes,  BrowserRouter } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/Signup.js';

function HomePage(){
  return (
    <>
     <Navbar/>
      <h1>
         <p><Link to="/Signup" className="Signup">Signup here</Link></p>
         <p><Link to="/MyAccount" className="MyAccount">My account</Link></p> 
         <p><Link to="/navbar" className="navbar">check out navbar</Link></p> 
      </h1>
    </>
  )
}

function App() {
  return (
    <>
     
     <div className="link-container">
     <BrowserRouter>
  <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/MyAccount" element={<MyAccount />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/login" element={<Login />} />
        
  </Routes>
</BrowserRouter>
      </div>
    </>
    
  );
}

export default App;
