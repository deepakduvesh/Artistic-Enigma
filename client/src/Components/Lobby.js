import React from 'react'
import '../Styles/Lobby.css';

const Lobby = () => {
  return (
    <div className="Lobby-container">
        <div className="Lobby-box">
            <h1>Welcome to the Game Lobby</h1>
            <div className="count">
                <p>Tottal number of player joined are:</p>
                <span>here write count</span>
            </div>

            <div className="enter-game">
                <button>Join</button>
            </div>
        </div>
    </div>
  )
}

export default Lobby;