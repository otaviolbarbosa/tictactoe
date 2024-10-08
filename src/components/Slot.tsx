import { Player } from "@/types/game";
import React, { useMemo } from "react";
import PlayerIcon from "./PlayerIcon";

type SlotProps = {
  value: Player;
  isHighlighted?: boolean;
  onClick: () => void;
};
const Slot = ({ value, isHighlighted = false, onClick }: SlotProps) => {
  return (
    <div
      className={[
        "flex items-center justify-center w-[100px] h-[100px] text-6xl font-sans font-semibold",
        isHighlighted ? "bg-green-500 text-white" : "bg-white",
      ].join(" ")}
      onClick={onClick}
    >
      <PlayerIcon player={value} />
    </div>
  );
};

export default Slot;
