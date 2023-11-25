import React, { useEffect, useState } from 'react'
import '../Styles/LeaderBoard.css';
import {socket} from "../App.js"
 const LeaderBoard = ({username, id,email}) => {
    const [players,setPlayers] = useState([])
    useEffect(()=>{
      socket.on("playerScore",(data)=>{
        console.log(data);
        setPlayers(data);
      })
    })
    
  return (
    <>
     <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            players.map((player, index) => (
              <tr key={index}>
                <td>{player.username}</td>
                <td>{player.score}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
     </div>
     </>
  )
}

export default LeaderBoard;
