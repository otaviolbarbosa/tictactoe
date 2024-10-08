"use client";

import React, { useEffect } from "react";
import Slot from "./Slot";
import useGame from "../hooks/useGame";
import PlayerIcon from "./PlayerIcon";
import { Move, Player } from "@/types/game";

type TicTacToeParams = {
  movements?: Move[];
};

const TicTacToe = ({ movements }: TicTacToeParams) => {
  const {
    board,
    moves,
    winner,
    winnerSlots,
    isDraw,
    initGame,
    checkBoard,
    nextPlayer,
    handleSlotClick,
    setBoard,
    setMoves,
  } = useGame();

  useEffect(() => {
    if (!moves.length) return;
    checkBoard();
    nextPlayer();
  }, [moves]);

  useEffect(() => {
    if(movements) {
      initGame(false);
      const newBoard = Array(9).fill(null)
      movements.map(movement => newBoard[movement.position] = movement.player)
      setBoard(newBoard)
      movements && setMoves(movements)
      checkBoard()
    }
  }, [movements]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-center">
        {!(movements) && (
          <button
            className="flex-1 border rounded p-4 bg-blue-700 text-white font-bold"
            onClick={() => initGame()}
          >
            Start game
          </button>
        )}
      </div>
      <div>
        <div className="grid grid-cols-3 gap-1 bg-gray-300">
          {board?.length &&
            board?.map((slot, index) => (
              <Slot
                key={index}
                value={slot}
                isHighlighted={winnerSlots?.includes(index)}
                onClick={() => handleSlotClick(index)}
              />
            ))}
        </div>
      </div>
      {winner && (
        <div className="bg-green-500 rounded-lg p-3 text-center">
          <div className="flex justify-center text-6xl text-gray-600">
            <PlayerIcon player={winner} />
          </div>
          <div className="font-bold text-white text-4xl">WINNER!</div>
        </div>
      )}
      {isDraw && (
        <div className="bg-gray-400 rounded-lg p-4 text-center">
          <div className="flex justify-center gap-4 text-6xl text-gray-600">
            <PlayerIcon player="X" />
            <PlayerIcon player="O" />
          </div>
          <div className="font-bold text-white text-4xl">DRAW!</div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
