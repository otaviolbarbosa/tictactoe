"use client"

import { Move, Player } from "@/types/game";
import { useEffect, useMemo, useState } from "react";
import useAuth from "./useAuth";

const useGame = () => {
  const [board, setBoard] = useState<Player[]>();
  const players: Player[] = ["X", "O"];
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>();
  const [realMatch, setRealMatch] = useState(true);
  const [winnerSlots, setWinnerSlots] = useState<number[]>();

  const { user } = useAuth();

  const initGame = (realMatch: boolean = true) => {
    setWinner(undefined);
    setWinnerSlots(undefined);
    setMoves([]);
    setCurrentPlayer("X");
    setBoard(Array(9).fill(null));
    setRealMatch(realMatch);
  };

  const checkBoard = () => {
    const winnerPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winnerPositions.forEach((winnerPosition) => {
      if (!board?.length) return;

      if (
        board[winnerPosition[0]] === currentPlayer &&
        board[winnerPosition[1]] === currentPlayer &&
        board[winnerPosition[2]] === currentPlayer
      ) {
        setWinner(currentPlayer);
        setWinnerSlots(winnerPosition);
      }
    });
  };

  const nextPlayer = () =>
    setCurrentPlayer(currentPlayer === players[0] ? players[1] : players[0]);

  const handleSlotClick = (index: number) => {
    if (!board?.length) return;
    if (board[index]) return;
    if (winner) return;

    const next = [...board];
    next[index] = currentPlayer;

    setBoard(next);

    setMoves([
      ...moves,
      {
        player: currentPlayer,
        position: index,
      },
    ]);
  };

  const isDraw = useMemo(() => moves.length === board?.length, [moves, board]);


  useEffect(() => {
    const checkIsGameOver = async () => {
      if (!!winner || isDraw) {
        await fetch("/api/matches", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            moves: JSON.stringify(moves),
            winner: winner,
            userId: user?.id,
          }),
        });
      }
    };

    realMatch && checkIsGameOver();
  }, [winner, isDraw]);

  return {
    board,
    players,
    moves,
    currentPlayer,
    winner,
    winnerSlots,
    isDraw,
    setBoard,
    setMoves,
    setCurrentPlayer,
    setWinner,
    setWinnerSlots,
    initGame,
    checkBoard,
    nextPlayer,
    handleSlotClick,
  };
};

export default useGame;
