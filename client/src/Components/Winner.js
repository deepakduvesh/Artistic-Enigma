import React from 'react';
import '../Styles/Winner.css';

const WinnersPage = ({players}) => (
  <div className="winners-page">
    <div className="winner-heading">
    <h1>Winners List</h1>
    </div>

    <div className="winner-middle">
    <div className="winner-table">
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {players.map((winner, index) => (
          <tr key={index}>
            <td className='winner-rank' >{index + 1}</td>
            <td className='winner-name' >{winner.username}</td>
            <td>{winner.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
     </div>
  </div>
);

export default WinnersPage;
