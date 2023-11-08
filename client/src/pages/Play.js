import React from 'react'
import './Play.css';
import LeaderBoard from './LeaderBoard';
import WhiteBoard from './WhiteBoard';
import Chat from './Chat';

 const Play = () => {
  return (
    <div className="main-game">
        <LeaderBoard/>
        <WhiteBoard/>
        <Chat/>
    </div>
  )
}

export default Play;