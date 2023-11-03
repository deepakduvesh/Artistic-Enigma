import React from 'react';
import './MyAccount.css'; // Import your CSS for MyAccount styles
// import userPhoto from './user.jpg'; // Import the user's photo

 const MyAccount = () => {
  const user = {
    name: 'John Doe', // Replace this with the user's name
    // You might have other user details here, but for simplicity, I'm including just the name
  };

  const handleEditProfile = () => {
    // Function to handle edit profile action
    // You can implement the logic for editing the profile here
    console.log('Edit Profile clicked');
  };

  const handleLogout = () => {
    // Function to handle logout action
    // You can implement the logout functionality here (clearing sessions, local storage, etc.)
    console.log('Logout clicked');
  };

  return (
    <div className="my-account-page">
      <div className="user-profile">
        {/* <img src={userPhoto} alt="User" /> */}
        <h2>{user.name}</h2>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default MyAccount;
