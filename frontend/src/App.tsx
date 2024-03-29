import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Goddle from "./pages/Goddle";
import BrokenTelephone from "./pages/BrokenTelephone";
import Algodle from "./pages/Algodle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goddle" element={<Goddle />} />
        <Route path="/broken-telephone" element={<BrokenTelephone />} />
        <Route path="/algodle" element={<Algodle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
