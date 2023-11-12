import React from 'react'
import '../Styles/LeaderBoard.css';
 const LeaderBoard = () => {
  return (
    <>
     {/* leaderboard  */}
     <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
     </>
  )
}

export default LeaderBoard;
