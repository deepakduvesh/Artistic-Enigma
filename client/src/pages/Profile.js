import React from 'react';
import './Profile.css'; 
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import user_icon from './Assets/profile.png'
 const Profile = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token') 
  const user = {
    name: 'John Doe', 
  };

  const handleEditProfile = () => {
    
    console.log('Edit Profile clicked');
  };

  const handleLogout = () => {
      if(token){
        Cookies.remove('token')
      }
      navigate("/")

    console.log('Logout clicked');
  };

  return (
    
    <div className="my-account-page">
      {/* <h1>
        hello
      </h1> */}
      <div className="user-profile">
        <img src={user_icon} alt="User" />
        <h2>{user.name}</h2>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
