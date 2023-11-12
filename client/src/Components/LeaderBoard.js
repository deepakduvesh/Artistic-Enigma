import React, { useEffect, useState } from 'react'
import '../Styles/LeaderBoard.css';
import {socket} from "../App.js"
 const LeaderBoard = () => {
  const player = null
  // const [map,setmap] = useState(Map)
  // useEffect(() => {
    // let mp =  new Map()
    const [mp,setmp] = useState(new Map());
    useEffect(()=>{
      socket.on("playerScore",(data)=>{
        const receivedMap = new Map(JSON.parse(data));
        console.log('Received Map:', receivedMap);
        setmp(receivedMap);
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
          {/* {players.map((player) => ( */}
            {/* <tr key={player.id}> */}
              {/* <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.score}</td> */}
            {/* </tr> */}
          {/* ))} */}
          {
            Array.from(mp.entries()).map(([key,score])=>(
              <tr key={key}>
                <td> {key} </td>
                <td> {score} </td>
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
