//import './App.css';
import { Route, Routes } from "react-router-dom";
import { Login, Signup} from "./pages";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; 
import  About from "./pages/About";
import  Contact from "./pages/Contact";
import  Services from "./pages/Services";
import Play from "./pages/Play";
import io from "socket.io-client"

export const socket = io.connect("http://localhost:4000")

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/Play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;
