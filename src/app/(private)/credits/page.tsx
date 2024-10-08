import Link from "next/link";
import React from "react";

const CreditsPage = () => {
  return (
    <div className="p-4">
      <div className="max-x-[720px] w-[720px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Credits</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-xl font-semibold">About me</div>
            <div className="text-justify md:text-right">
              <div className="font-semibold">Otavio Barbosa</div>
              <div>Senior Front-end Engineer</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-xl font-semibold mt-2">Contacts</div>
            <div className="text-justify md:text-right">
              <div>Phone number: +5584981720382</div>
              <div>email: otavioblbarbosa@gmail.com</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-xl font-semibold mt-2">Links</div>
            <div className="text-justify md:text-right">
              <Link href="https://github.com/otaviolbarbosa" target="_blank">
                Github
              </Link>
              <Link
                href="https://linkedin.com/in/otaviolbarbosa"
                target="_blank"
              >
                Linkedin
              </Link>
            </div>
          </div>
        </div>
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

export default CreditsPage;
