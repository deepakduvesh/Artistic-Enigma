
import React, { useEffect, useState } from 'react';
import rocket from '../Assets/rocket.png';
import '../Styles/Lobby.css';
import { socket } from '../App';
import { useNavigate } from 'react-router-dom';

const PlayerTable = ({ playerNames }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Player Names</th>
        </tr>
      </thead>
      <tbody>
        {playerNames.map((name, index) => (
          <tr key={index}>
            <td>{name.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Lobby = () => {
  const navigate = useNavigate();
  const [roomNo, setRoomNo] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [canStart, setCanStart] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);
  const [roomSize, setRoomSize] = useState(null);

  useEffect(() => {
    const ldata = sessionStorage.getItem('loginData');
    const loginData = JSON.parse(ldata);

    if (loginData) {
      setEmail(loginData.email);
      setUsername(loginData.username);
    }
  }, []);

  useEffect(() => {
    socket.on('roomNo', (data) => {
      setRoomNo(data.roomNo);
      setRoomSize(data.roomSize);
    });

    socket.on('canStart', (data) => {
      console.log('yes start');
      setCanStart(data);
    });
  }, []);

  useEffect(() => {
    if (canStart) {
      navigate('/Play');
    }
  }, [canStart, navigate]);

  useEffect(() => {
    if (roomNo && username && email) {
      const joinData = {
        email: email,
        username: username,
        roomNo: roomNo,
      };
      socket.emit('joinRoom', joinData);
      socket.emit('playersNo', roomNo);

      socket.on('roomPlayers', (data) => {
        console.log(data);
        setTotalPlayers(data.length);
        setPlayerNames(data);
      });
    }
  }, [roomNo, username, email]);

  useEffect(() => {
    function stars() {
      let count = 50;
      let scene = document.querySelector('.scene');
      let i = 0;
      while (i < count) {
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);

        let duration = Math.random() * 1;
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 1 + 'px';
        star.style.height = 50 + h + 'px';
        star.style.animationDuration = duration + 's';

        scene.appendChild(star);
        i++;
      }
    }

    stars();
  }, []);

  return (
    <>
      <div className="scene">
        <div className="rocket">
          <img src={rocket} alt="rocket" />
        </div>
      </div>

      <div className="Lobby-container">
        <div className="Lobby-box">
          <div className="welcome">
            <center>
              <h1>Welcome to the Game Lobby</h1>
            </center>
          </div>

          <div className="Lobby-middle">
            <div className="player-container">
              <h2> Players </h2>
              <p>Total Players: {totalPlayers}</p>
              <PlayerTable playerNames={playerNames} />
            </div>
            <div className="rules-container">
              <h2> Rules </h2>
              <div className="rules-para">
                <p>The challenge is to convey the word through illustrations, don't use letters.</p>
                <p>Artists earn points for correct guesses of their drawing. Guessers earn points for correctly identifying the word.</p>
                <p>Players must guess the word in the chatbox during the drawing phase.</p>
                <p>Play multiple rounds with different words for each round. The player with the highest total score at the end of all rounds wins.</p>
                <p>You will be kicked out in case of using abusive words.</p>
                <p>Play sincerely, best of luck! </p>
              </div>
            </div>
          </div>

          <div className="count">
            <span>
              {' '}
              <strong> Room code: {roomNo} / players: {totalPlayers} out of {roomSize} </strong>{' '}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
