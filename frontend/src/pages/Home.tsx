import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='bg-Blue1 min-h-screen'>
      <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
      <div className="grid grid-cols-1 justify-items-center">
        <div className="my-10 pb-28 pt-8 text-2xl">Welcome to the Algomes🤓! Choose a game!</div>
        <div className="grid grid-cols-3 justify-items-center gap-1 h-[250px] w-[910px]">
        <Link to="/goddle" className="w-[250px] text-2xl bg-white flex items-center justify-center rounded-md cursor-pointer hover:bg-Blue3">
          <div >Godle</div>
        </Link>
        <Link to="/connections"className="w-[250px] text-2xl bg-Green1 flex items-center justify-center rounded-md cursor-pointer hover:bg-Blue3">
          <div>Connections</div>
        </Link>
        <Link to="/algodle"className="w-[250px] text-2xl bg-Yellow1 flex items-center justify-center rounded-md cursor-pointer hover:bg-Blue3">
          <div>Algodle</div>
        </Link>
        </div>
      </div>
    </div>
  )
}
