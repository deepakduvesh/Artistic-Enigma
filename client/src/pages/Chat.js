import React, { useState } from 'react';
import './Chat.css';
import {Link} from "react-router-dom";
function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('User');
  
    const handleInputChange = (event) => {
      setNewMessage(event.target.value);
    };
  
    const sendMessage = () => {
      if (newMessage.trim() !== '') {
        const message = {
          sender: username,
          time: new Date().toLocaleString(),
          text: newMessage,
        };
        setMessages([...messages, message]);
        setNewMessage('');
      }
    };
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
