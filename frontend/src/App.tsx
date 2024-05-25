import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Goddle from "./pages/Goddle";
import BrokenTelephone from "./pages/BrokenTelephone";
import Algodle from "./pages/Algodle";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div>
        <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/goddle" element={<Goddle />} />
            <Route path="/broken-telephone" element={<BrokenTelephone />} />
            <Route path="/algodle" element={<Algodle />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
