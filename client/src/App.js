//import './App.css';
import { Route, Routes } from "react-router-dom";
import { Login, Signup} from "./pages";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import  About from "./pages/About";
import  Contact from "./pages/Contact";
import  Services from "./pages/Services";
 
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
      </Routes>
    </div>
  );
}

export default App;
