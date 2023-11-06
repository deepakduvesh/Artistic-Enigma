import React,{useState,useEffect} from 'react';
import './Profile.css'; 
import axios from 'axios';
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import user_icon from './Assets/profile.png'



 const Profile = () => {

  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const navigate = useNavigate();
  const token = Cookies.get('token') 

  const [profileImage, setProfileImage] = useState("");
    const [data, setData] = useState([]);
    const [param1, setParam1] = useState(loginData.email);
    if(!token){
      navigate("/") 
    }
    useEffect(() => {
        console.log(loginData.email);
        
        // Use a function to fetch the profile data and handle the response
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:4000/profile', {
                    params: {
                        param1: param1,
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

        fetchProfile(); // Call the function to initiate the request

    }, [param1]);



  const user = {
    name: loginData.username, 
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
        <img src={profileImage} alt="User" />
        <h2>{loginData.username}</h2>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
