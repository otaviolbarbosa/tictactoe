import { FC } from "react";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";

type GameLayoutProps = {
  children: React.ReactNode;
};

const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  return (

    <div>
      <div className="flex justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div>
          <span>TicTacToe</span>
        </div>
        <div className="max-x-[720px] w-[720px] mx-auto">
          <ul className="flex gap-6 px-4">
            <li><Link href="/game">Play</Link></li>
            <li><Link href="/matches">View Matches</Link></li>
            <li><Link href="/instructions">Instructions</Link></li>
            <li><Link href="/credits">Credits</Link></li>
          </ul>
        </div>
        <div className="flex items-center">
          <SignOutButton />
        </div>
      </div>
      {children}
    </div>
  );
};

export default GameLayout;
