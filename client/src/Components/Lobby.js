import React, { useEffect } from 'react'
import rocket from '../Assets/rocket.png';
import '../Styles/Lobby.css';

 const Lobby = ( {count} ) => {
    useEffect(()=>{
        function stars(){
            let count = 50;
            let scene = document.querySelector('.scene');
            let i = 0;
            while (i < count){
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
       
    })
       
  return (
    <>
       <div className="scene">
        <div className="rocket">
            <img src={rocket} alt="rocket"/>
        </div>
       </div>

       <div className="Lobby-container">
        <div className="Lobby-box">
            <h1>Welcome to the Game Lobby</h1>
            <div className="count">
                <p><strong>Tottal number of player joined are: </strong></p>
                <span> <strong> total player in lobby { count } out of 3 </strong> </span>
            </div>

            {/* <div className="enter-game">
                <button>Join</button>
            </div> */}
        </div>
    </div>
    </>
  )
}

export default Lobby;