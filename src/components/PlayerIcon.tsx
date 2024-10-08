import React from "react";
import { Player } from "@/types/game";
import { MdClose } from "react-icons/md";
import { MdOutlineBrightness1 } from "react-icons/md";

type PlayerIconProps = {
  player: Player;
};
const PlayerIcon = ({ player }: PlayerIconProps) => {
  switch (player) {
    case "X":
      return <MdClose />;
    case "O":
      return <MdOutlineBrightness1 />;
    default:
      return <></>;
  }
};

export default PlayerIcon;
