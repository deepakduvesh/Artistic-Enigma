import React from 'react';
import '../Styles/Winner.css';

// const winnersData = [
//   { name: 'Player 1', score: 100 },
//   { name: 'Player 2', score: 90 },
//   { name: 'Player 3', score: 80 },
//   // Add more winners as needed
// ];

const WinnersPage = ({players}) => (
  <div className="winners-page">
    <div className="winner-heading">
    <h1>Winners List</h1>
    </div>

    <div className="winner-middle">
    {/* <div className="left-img">
        <img src={leftImg} alt="" />
     </div> */}
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
            <td>{winner.name}</td>
            <td>{winner.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    {/* <div className="right-img">
        <img src={rightImg} alt="" />
     </div> */}
     </div>
     
  </div>
);

export default WinnersPage;
