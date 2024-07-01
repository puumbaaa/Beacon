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

function App() {
  return (
    <Router>
      <div>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usersearch" element={<UserSearching />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
