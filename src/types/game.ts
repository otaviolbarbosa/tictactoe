export type Player = "X" | "O";

export type Move = {
  player: Player;
  position: number;
};

export type Match = {
  userId: string;
  movements: Move[];
  createdAt: string;
  updatedAt: string;
};
