import React,{useState,useEffect} from 'react';
import '../Styles/Profile.css'; 
import axios from 'axios';
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import user_icon from '../Assets/profile.png'



 const Profile = () => {

  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const navigate = useNavigate();
  const token  = sessionStorage.getItem('token')
      if(!token){
        navigate("/") 
      }
  const [profileImage, setProfileImage] = useState("");
    const [data, setData] = useState([]);
    const [param1, setParam1] = useState("");
 
    
    useEffect(() => {
      if(loginData){
        setParam1(loginData.email)
        const fetchProfile = async () => {
          try {
              const response = await axios.get('http://localhost:4000/profile', {
                  params: {
                      param1:param1
                  },
              });

              if (response.data.status === true) {
                  const serverUrl = `http://localhost:4000/uploads/${response.data.pic}`; 
              
              setProfileImage(serverUrl);
              } else {
                  console.log("Profile pic not found");
              }
          } catch (error) {
              console.error("Error fetching profile data:", error);
          }
      };

      fetchProfile();

      }else{
        navigate("/")
      }

        
    }, [param1]);

  const handleEditProfile = () => {
    
    console.log('Edit Profile clicked');
  };

  const handleLogout = () => {
      if(token){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loginData')
      }
      navigate("/")

    console.log('Logout clicked');
  };

  return (
    <>
    {token?(

     <div className="profile-container"> 
    <div className="my-account-page">
      <div className="user-profile">
        <img src={profileImage} alt="User" />
        <h2>{loginData.username}</h2>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </div>
    ):(navigate("/"))}
    
    </>
   
   
  );
};

export default Profile;
