import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Button from "./pages/playersearch";

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Button />} />
    </Routes>
  </Router>
}

export default App;
