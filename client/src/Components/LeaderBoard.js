import React, { useEffect, useState } from 'react'
import '../Styles/LeaderBoard.css';
import {socket} from "../App.js"
 const LeaderBoard = ({username, id}) => {
  const player = null
  // const [map,setmap] = useState(Map)
  // useEffect(() => {
    // let mp =  new Map()
    const [mp,setmp] = useState(new Map());
    useEffect(()=>{
      socket.on("playerScore",(data)=>{
        const receivedMap = new Map(JSON.parse(data));
        // console.log('Received Map:', receivedMap);
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
          {
            Array.from(mp.entries()).map(([key,[score,username]])=>(
              <tr key={key}>
                <td> {username} </td>
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
