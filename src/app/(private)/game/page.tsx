import TicTacToe from "@/components/TicTacToe";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const Game = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login"); 
  }
  return (
    <div className="mx-auto py-5 w-[308px]">
      <TicTacToe />
    </div>
  );
};

export default Game;
