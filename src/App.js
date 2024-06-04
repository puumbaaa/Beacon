import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Gallery from "./pages/playersearch";

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Gallery />} />
    </Routes>
  </Router>
}

export default App;
