import { useEffect, useState } from "react";
import gsap from 'gsap';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Home.css";
import {ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import logo from '../Assets/logo1.png';
import home from '../Assets/home.png';
import { socket } from "../App";
import {MenuIcon, CloseIcon} from '../Components/MySvgIcon.js';

const Home = () => {
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("")
  const [roomSize,setRoomSize] = useState(0)
  const [roomNo, setRoomNo] = useState(null)
  const [isPrivateClicked, setIsPrivateClicked] = useState(false);
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const t = sessionStorage.getItem('token')
  console.log("token : ",t);
  console.log(loginData)

  useEffect(()=>{
    if(loginData){
      setEmail(loginData.email);
      setUsername(loginData.username)
    }
  })

  const navigate = useNavigate();
  const deleteCookie = ()=>{
    if(t){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loginData')
    } 
    navigate("/")
  }
 

  useEffect(() => {
    
    let navbar = document.querySelector('.home-header .navbar')
    
    document.querySelector('#menu').onclick = () =>{
      navbar.classList.add('active');
    }
    
    document.querySelector('#close').onclick = () =>{
      navbar.classList.remove('active');
    }
    
    document.addEventListener('mousemove', move);
    function move(e){
      this.querySelectorAll('.move').forEach(layer =>{
        const speed = layer.getAttribute('data-speed')
    
        const x = (window.innerWidth - e.pageX*speed)/120
        const y = (window.innerWidth - e.pageY*speed)/120
    
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    
      })
    }
    
    
        gsap.to('.logo', 1, { opacity: 2, duration: 1, delay: 2, y: 10 });
        gsap.to('.navbar a', 1,  { opacity: 2, duration: 1, delay: 2.1, y: 10, stagger: 0.2 });
        gsap.to('.title', 1,  { opacity: 2, duration: 1, delay: 1.6, y: 30 });
        gsap.to('.description', 1,  { opacity: 2, duration: 1, delay: 1.8, y: 30 });
        gsap.to('.btn', 1,  { opacity: 2, duration: 1, delay: 2.1, y: 30 });
        gsap.to('.image', 1,  { opacity: 2, duration: 1, delay: 2.6, y: 30 });
    
      }, []);

      const createData = {
        email: email,
        username: username,
        roomSize: roomSize,
        roomNo: 0,
      }

      const joinData = {
        email: email,
        username: username,
        roomNo: roomNo,
      }

      const publicData = {
        email: email,
        username: username,
        roomNo: roomNo,
        type: "public"
      }

      const create = () =>{
        socket.emit("joinRoom",createData);
        navigate("/Lobby")
      }

      const join = () =>{
        socket.emit("joinRoom",joinData);
        navigate("/Lobby")
      }

      const publicJoin = () =>{
        socket.emit("joinRoom",publicData);
        navigate("/PublicPlay")
      }

  return (
    <div className="home-container">

<header className="home-header">
                
                <a className='logo'>
                  <img src={logo} alt="logo"/>
                </a>
                
                <nav className="navbar">
                  <div className="navbar-left">
                     <div id='close' className='fas fa-times' >
                       <CloseIcon/>
                     </div>
                     <a className="nav_items"><Link to="/Home" > Home </Link></a>
                     <a className="nav_items"><Link to="/Team" > Team </Link></a>
                     <a className="nav_items"><Link to="/Contact" > Contact </Link></a>
                     <a className="nav_items"><Link to="/Services" > Services </Link></a>
                  </div>
                      { t?
                      (<div className="navbar-right">
                     <a className="nav_items"> <Link onClick={deleteCookie} to="/" > logout</Link> </a>
                     <a className="nav_items"> <Link to="/profile"> profile</Link> </a>
                      </div>
                      ):
                      ( 
                       <div className="navbar-right">
                       <a className="nav_items"><Link to="/signup" > sign up</Link></a>
                       <a className="nav_items"><Link to="/login"> sign in</Link></a>
                       </div>
                      )}
                </nav>

                <div id="menu" className="fas fa-bars">
                    <MenuIcon/>
                </div>
        </header>


        <section className="home">
                 <div className="content">
                  <h1 className="title">Artistic <span>Enigma</span> <span>draw</span> and <span>guess</span> </h1>

                  <p className="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque ducimus, rerum quas inventore sunt hic accusantium.</p>
                 
                 {t?(
                  <div className="play-buttons">
                   <button className='btn' onClick={publicJoin}>public</button> 
                  <a className='btn' onClick={() => setIsPrivateClicked(true)} > Private </a>
                  </div>
                 ):("please do login to play")}

                {isPrivateClicked && (
                  <>
                  <div className="enter-code">
                    <input type="text" placeholder="Enter code" onChange={(e) => setRoomNo(parseInt(e.target.value))}/>
                    <button onClick={join}>enter</button>
                  </div>
                  
                  <div className="create-room">
                    <label for="numberSelector">Select a number:</label>
                     <select id="numberSelector"  onChange={(e) => setRoomSize(parseInt(e.target.value))}>
                       <option value="">default</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                       <option value="6">6</option>
                       <option value="7">7</option>
                       <option value="8">8</option>
                       <option value="9">9</option>
                       <option value="10">10</option>
                     </select>
                     <button onClick={create}>create</button>
                  </div>
                  </>
                )}  

                 </div>
                 <div className="image">
                   <img src={home} alt="home" data-speed="-3" className='move' />
                 </div>
        </section>  
    </div>

  );
};

export default Home;