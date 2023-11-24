import React, { useEffect, useState } from 'react'
import '../Styles/LeaderBoard.css';
import {socket} from "../App.js"
 const LeaderBoard = ({username, id,email}) => {
  const player = null
  // const [map,setmap] = useState(Map)
  // useEffect(() => {
    // let mp =  new Map()
    const [players,setPlayers] = useState([])
    useEffect(()=>{
      socket.on("playerScore",(data)=>{
        // const receivedMap = new Map(JSON.parse(data));
        console.log(data);
        // const receivedMap = new Map(data);
        // console.log('Received Map:', receivedMap);
        // setmp(receivedMap);
        setPlayers(data);
      })
    })
    
  // })
  return (
    
    <>
     {/* leaderboard  */}
     <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Name</th> */}
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            // Array.from(mp.entries()).map(([key,[score,username]])=>(
            //   <tr key={key}>
            //     <td> {username} </td>
            //     <td> {score} </td>
            //   </tr>
            // ))
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
