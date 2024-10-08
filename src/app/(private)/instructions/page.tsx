import React from "react";

const InstructionsPage = () => {
  return (
    <div className="p-4 overflow-clip">
      <div className="max-x-[720px] w-[720px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ol>
          <li>The game board is a 3x3 grid (a total of 9 squares).</li>
          <li>Each player will choose a symbol: Player 1 is "X" and Player 2 is "O".</li>
          <li>Player 1 ("X") goes first by default.</li>
          <li>Players take turns to place their symbol (either "X" or "O") in an empty square.</li>
          <li>The first player to act places their symbol in one of the empty squares.</li>
          <li>A player wins if they have three of their symbols in a row, column, or diagonal.</li>
          <li>Winning condition 1: Three of the same symbols in any horizontal row.</li>
          <li>Winning condition 2: Three of the same symbols in any vertical column.</li>
          <li>Winning condition 3: Three of the same symbols in either diagonal.</li>
          <li>If a player meets one of the winning conditions, they win the game.</li>
          <li>If all 9 squares are filled and no one has won, the game is a draw.</li>
          <li>Reset the board and take turns starting the game.</li>
        </ol>
      </div>
      
{/*         
      Who goes first:
        
      Take turns marking the grid:
        Players take turns to place their symbol (either "X" or "O") in an empty square.
        The first player to act places their symbol in one of the empty squares.
      Check for a winner after each turn:
        A player wins if they have three of their symbols in a row, column, or diagonal.
      Winning conditions:
        Three of the same symbols in any horizontal row.
        Three of the same symbols in any vertical column.
        Three of the same symbols in either diagonal.
      End of the game:
        If a player meets one of the winning conditions, they win the game.
        If all 9 squares are filled and no one has won, the game is a draw.
      Start a new game (optional): Reset the board and take turns starting the game. */}
    </div>
  );
};

export default InstructionsPage;
