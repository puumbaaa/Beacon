import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home.jsx';
import UserSearching from './pages/playersearch.jsx';
import ListChampGuid from './pages/guides.jsx';
import ChampGuid from './pages/champion.jsx';
import Register from "./pages/register.jsx";
import { NotFound } from './components/NotFound';
import { CustomNavbar } from './components/navbar';
import { Footer } from './components/footer';
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import InGameProfile from "./pages/game_stats.jsx";

function App() {

  return (
    <Router>
      <div>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usersearch" element={<UserSearching />} />
          <Route path="/register" element={ localStorage.getItem("email") === null ? <Register /> : <Profile />} />
          <Route path="/login" element={ localStorage.getItem("email") === null ? <Login /> : <Profile />} />
          <Route path="/profile" element={ localStorage.getItem("email") !== null ? <Profile /> : <Register />} />
          <Route path="/in-game-profile" element={ localStorage.getItem("email") === null ? <InGameProfile /> : <InGameProfile /> } />
          <Route path="/guide" element={<ListChampGuid />} />
          <Route path="/guide/:id" element={<ChampGuid />} />
          <Route path="*" element={<NotFound />} /> {/* This catches all undefined routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
