//import './App.css';
import { Route, Routes } from "react-router-dom";
import { Login, Signup} from "./pages";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; 
import  Team from "./pages/Team";
import  Contact from "./pages/Contact";
import  Services from "./pages/Services";
import Play from "./pages/Play";
import Lobby from "./pages/Lobby.js";
import io from "socket.io-client";
import PublicPlay from './pages/PublicPlay.js';


export const socket = io("https://artistic-enigma-1.onrender.com", {
  transports: ["websocket"],         
  withCredentials: true              
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/Team" element={<Team/>} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/Play" element={<Play />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/PublicPlay" element={<PublicPlay />} />
      </Routes>
    </div>
  );
}

export default App;
