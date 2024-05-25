export default function Sidebar() {
  const games = ["Algodle", "Game 2", "Game 3"];

  return (
    <div className="bg-black row-span-4 absolute h-[88vh] w-72 py-10 px-5">
      <div className="text-white text-lg font-semibold">
        {games.map((game, idx) => (
          <div key={idx}>{game}</div>
        ))}
      </div>
    </div>
  );
}
