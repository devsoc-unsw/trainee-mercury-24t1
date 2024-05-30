import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goddle from "./pages/Goddle";
import BrokenTelephone from "./pages/BrokenTelephone";
import Algodle from "./pages/Algodle";
import Connections from "./pages/Connections";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/goddle" element={<Goddle />} />
            <Route path="/broken-telephone" element={<BrokenTelephone />} />
            <Route path="/algodle" element={<Algodle />} />
            <Route path="/connections" element={<Connections />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
