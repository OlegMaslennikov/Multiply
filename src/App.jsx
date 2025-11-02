import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./_pages/Home.jsx";
import Training from "./_pages/training.jsx";
import Stats from "./_pages/Stats.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}
