import { motion } from "framer-motion";

export default function Sidebar() {
  const games = ["Algodle", "Connections", "Broken Tele"];

  return (
    <motion.div
      className="bg-black row-span-4 absolute h-[88vh] w-72 py-10 px-5"
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -100, opacity: 0 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", bounce: 0 }}
    >
      <div className="text-white text-lg font-semibold">
        {games.map((game, idx) => (
          <div key={idx}>{game}</div>
        ))}
      </div>
    </motion.div>
  );
}
