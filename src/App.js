import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import UserSearching from './pages/playersearch';
import {SQLHandler} from "./handlers/sql_handler";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/usersearch" element={<UserSearching />} />
         <Route path="/sql" element={<SQLHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
