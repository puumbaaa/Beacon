import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Gallery from "./pages/test";
import Button from "./pages/exemple";

function App() {
  return <Router>
    <Routes>
      <Route path="/galery" element={<Gallery />} />
      <Route path="/button" element={<Button />} />
    </Routes>
  </Router>
}

export default App;
