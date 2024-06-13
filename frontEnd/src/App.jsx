import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home.jsx';
import UserSearching from './pages/playersearch.jsx';
import {SQLHandler} from "./handlers/sql_handler.jsx";
import ListChampGuid from './pages/guides.jsx';
import ChampGuid from './pages/champion.jsx';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/usersearch" element={<UserSearching />} />
         <Route path="/sql" element={<SQLHandler />} />
         <Route path="/guide" element= {<ListChampGuid/>}/>
         <Route path="/guide/:id" element={<ChampGuid />} />
      </Routes>
    </Router>
  );
}

export default App;
