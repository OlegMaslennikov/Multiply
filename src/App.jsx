import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Training from "./pages/Training.jsx";
import Stats from "./pages/Stats.jsx";

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
