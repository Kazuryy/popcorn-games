import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Tunnel from './pages/Tunnel';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ManageGame from './pages/ManageGame';
import Play from './pages/Play';
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
          <Route path="/manage-game" element={<ManageGame />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;