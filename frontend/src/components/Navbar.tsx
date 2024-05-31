import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white text-black text-opacity-75 bg-opacity-75 py-5 items-center justify-center px-3 grid grid-cols-5 row-span-1 h-21 border-white border-b">
      <button onClick={toggleSidebar}>
        <Bars3Icon className="stroke-black fill-black w-7 h-7" />
      </button>
      <div className="font-bold text-3xl col-span-3 mx-auto cursor-pointer" onClick={() => navigate(`/Home`)}>Algomes</div>
      <a href="https://www.youtube.com/watch?v=oHg5SJYRHA0" target="_blank" rel="noopener noreferrer">
      <button className="rounded-2xl border border-black px-3 py-1">
        Subscribe to us
      </button>
      </a>
    </div>
  );
}
