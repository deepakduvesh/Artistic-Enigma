import React, { useEffect, useState } from 'react';
import '../Styles/Chat.css';
import {Link} from "react-router-dom";
import {socket} from '../App.js';
import Peer from 'simple-peer';
function Chat({username, id, email, guessed, setGuessed}) {

  
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [word, setWord] = useState('');
    const [drawid, setDrawid] = useState('')
    const [seconds, setSeconds] = useState(0);
    const [roomNo, setRoomNo] = useState(0);
    const handleInputChange = (event) => {
      setNewMessage(event.target.value);
    };
    

    useEffect(()=>{
      socket.on("turn",(data)=>{
        setRoomNo(data.roomNo);
      })
    })


    useEffect(() => {
      
      socket.on("choosenWord",(data)=>{
        setWord(data.word)
        setDrawid(data.email)

      })
      const interval = setInterval(()=>{
          setSeconds((prevSeconds)=>prevSeconds+1);
        },1000)
      socket.on("endTurn",(data)=>{
        setGuessed(false);
        setSeconds(0)
        setDrawid('')
        setWord('')
        clearInterval(interval)
      })
      
      return ()=>{
        clearInterval(interval);
        setSeconds(0)
      }
    },[word,guessed])

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    };

   
    const sendMessage = async() => {
      if (newMessage.trim() !== '' && newMessage !== word) {
        const message = {
          sender: username,
          time: new Date().toLocaleString(),
          text: newMessage,
          roomNo:roomNo,
        };
        await socket.emit("send_msg",message);
        setMessages([...messages, message]);
        setNewMessage('');
      }
      else if(newMessage.trim() !=='' && newMessage === word && email !== drawid && !guessed){
        const data = {
          email: email,
          opponentid: drawid,
          word: word, 
          time: seconds,
          username:username,
          roomNo:roomNo, 
        }
        setGuessed(true);  
        setSeconds(0);
        socket.emit("guessed",data);
        const message = {
          time: new Date().toLocaleString(),
          text: `${username} has guessed`,
          roomNo: roomNo
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
    <div className="right">
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <p><strong className='sender-name' >{message.sender}</strong></p>
              <p>{message.text}</p>
              <p> <h6> {message.time} </h6> </p>
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Chat;
