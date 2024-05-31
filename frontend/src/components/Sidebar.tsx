import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const games = ["Algodle", "Connections", "Goddle"];
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white bg-opacity-75 row-span-4 absolute h-[95vh] w-72 py-10 px-5"
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -100, opacity: 0 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", bounce: 0 }}
    >
      <div className="text-black text-lg font-semibold">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="pb-8 cursor-pointer"
            onClick={() => navigate(`/${game}`)}
          >
            {game}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
