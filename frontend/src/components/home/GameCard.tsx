type GameCardProps = {
  name: string;
  color: string;
};

export default function GameCard({ name, color }: GameCardProps) {
  return (
    <div className={`flex items-center w-60 h-60 justify-center rounded-md p-10 hover:opacity-80 cursor-pointer ${color}`}>
      <div className="font-bold text-xl flex text-center text-Blue2">{name}</div>
    </div>
  );
}
