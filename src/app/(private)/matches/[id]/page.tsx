"use client";

import { userSelector } from "@/app/store/slices/authSlice";
import TicTacToe from "@/components/TicTacToe";
import { Move, Player } from "@/types/game";
import { Match } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const MatchPage = () => {
  const params = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match>();
  const user = useSelector(userSelector);

  const fetchMatch = async () => {
    const matchData = await fetch(`/api/matches/${params.id}`);

    setMatch((await matchData.json()).match);
  };

  useEffect(() => {
    fetchMatch();
  }, []);

  const matchMovements = useMemo(() => {
    if (!match) return [];
    return JSON.parse(match?.movements as string) as Move[];
  }, [match]);

  if (!match) return <></>;

  return (
    <div className="p-4 overflow-clip">
      <div className="max-x-[720px] w-[720px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Match Summary</h2>
        <div className="flex">
          <div className="mx-auto py-5 w-[308px]">
            <TicTacToe movements={matchMovements} />
          </div>
          <div>
            <span className="text-2xl font-bold mb-5">Players movements</span>
            <ol>
              {matchMovements.map((movement) => (
                <li>
                  Player {movement.player} clicked on slot {movement.position}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
