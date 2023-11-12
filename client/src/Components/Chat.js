import React, { useEffect, useState } from 'react';
import '../Styles/Chat.css';
import {Link} from "react-router-dom";
import {socket} from '../App.js';

function Chat({username, id}) {

  
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [word, setWord] = useState('');
    const [drawid, setDrawid] = useState('')
    const [guessed, setGuessed] = useState(false)

    const handleInputChange = (event) => {
      setNewMessage(event.target.value);
    };
    

    useEffect(() => {
      socket.on("choosenWord",(data)=>{
        setWord(data.word)
        setDrawid(data.id)
      })
      socket.on("endTurn",(data)=>{
        setGuessed(false);
      })
    })

    const sendMessage = async() => {
      if (newMessage.trim() !== '' && newMessage !== word) {
        const message = {
          sender: username,
          time: new Date().toLocaleString(),
          text: newMessage,
        };
        await socket.emit("send_msg",message);
        setMessages([...messages, message]);
        setNewMessage('');
      }
      else if(newMessage === word && id !== drawid){
        const data = {
          myid: id,
          opponentid: drawid,
          word: word, 
        }
        socket.emit("guessed",data);
        setGuessed(true);
        
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
    <div>
      {
        guessed?(
          <p>
            you guessed
          </p>
        ):
        ""
      }
    </div>
    </>

  )
}

export default Chat;
