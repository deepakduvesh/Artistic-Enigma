import React, { useEffect, useState } from 'react';
import './Chat.css';
import {Link} from "react-router-dom";
import {socket} from '../App.js';
function Chat({username}) {
  // const ldata = sessionStorage.getItem("loginData")
  // const loginData = JSON.parse(ldata)
  
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // const [username, setUsername] = useState('User');

    // if(loginData){
    //   setUsername(loginData.username)
    // }
  
    const handleInputChange = (event) => {
      setNewMessage(event.target.value);
    };
  
    const sendMessage = async() => {
      if (newMessage.trim() !== '') {
        const message = {
          sender: username,
          time: new Date().toLocaleString(),
          text: newMessage,
        };
        await socket.emit("send_msg",message);
        setMessages([...messages, message]);
        setNewMessage('');
      }
    };
    useEffect(()=>{
      socket.on("receive_msg",(data)=>{
        setMessages([...messages, data]);
      })
    })
  return (
    <>
    {/* chat-box */}
    <div className="right">
      {/* <h1>Group Chat</h1> */}
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <p><strong>{message.sender}</strong> - {message.time}</p>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message"
          />
          <div className="send">
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default Chat;
