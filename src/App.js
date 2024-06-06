import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserSearching from "./pages/playersearch";
import Home from "./pages/home";

function App() {
  return <Router>
    <Routes>
      <Route path="/usersearch" element={<UserSearching />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
}

export default App;
