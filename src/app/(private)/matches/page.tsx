"use client";

import { userSelector } from "@/app/store/slices/authSlice";
import PlayerIcon from "@/components/PlayerIcon";
import { Player } from "@/types/game";
import { Match } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>();
  const user = useSelector(userSelector);

  const fetchMatches = async () => {
    const matchesData = await fetch(`/api/matches-by-user/${user?.id}`);

    setMatches((await matchesData.json()).matches as Match[]);
  };

  useEffect(() => {
    fetchMatches();
  }, []);
  return (
    <div className="p-4 overflow-clip">
      <div className="max-x-[720px] w-[720px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Previous Matches</h2>
        <div className="flex flex-col gap-4">
          {matches?.map((match, index) => (
            <div key={index} className="border rounded border-gray-400 p-4">
              <div className="text-xl font-bold">Match {index + 1}</div>
              <div>
                Match date: {dayjs(match.createdAt).format("MMM DD, HH:mm")}
              </div>
              <div className="flex items-center"><div>Winner:</div> <PlayerIcon player={match.winner as Player} /></div>
              <div>
                <Link
                  href={`/matches/${match.id}`}
                  className="bg-blue-700 rounded-md text-white font-semibold px-5 py-3"
                >
                  View Match Summary
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
