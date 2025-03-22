import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Tunnel from './pages/Tunnel';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Play from './pages/Play';
import Join from './pages/Join';
import CreateGame from './pages/CreateGame';
import WaitingRoom from './pages/WaitingRoom';
import GameSettings from "./pages/GameSettings";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/tunnel" element={<Tunnel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/play" element={<Play />} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/join" element={<Join />} />
          <Route path="/create-game" element={<CreateGame />} />  
          <Route path="/game-settings" element={<GameSettings />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;