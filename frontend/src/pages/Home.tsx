import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
      <div className="grid grid-cols-1 justify-items-center">
        <div className="my-10">Welcome! Choose a game!</div>
        <div className="grid grid-cols-2 justify-items-center gap-1 h-[300px] w-[810px]">
        <Link to="/goddle" className="w-[300px] bg-gray-200 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-400">
          <div >Godle</div>
        </Link>
        <Link to="/connections"className="w-[300px] bg-gray-200 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-400">
          <div>Connections</div>
        </Link>
        </div>
      </div>
    </div>
  )
}
