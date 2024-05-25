import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <div className="w-full bg-black text-white py-5 mb-10 items-center justify-center px-3 grid grid-cols-5">
      <button>
        <Bars3Icon className="stroke-white fill-white w-7 h-7" />
      </button>
      <div className="font-bold text-3xl col-span-3 mx-auto">Goddle</div>
      <button className="rounded-2xl border border-white px-3 py-1">
        Subscribe to us
      </button>
    </div>
  );
}
