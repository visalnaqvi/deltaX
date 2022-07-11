import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreateUser from "./components/create-user.component"
import HomeScreen from "./components/home_screen.component";
import CreateSong from "./components/create-song";
import Login from "./components/log-in"
function App() {
  return (
    <Router> 
      <Routes>
     
      
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/add-song" element={<CreateSong />} />
     
     
      </Routes>
     
    </Router>
  );
}

export default App;