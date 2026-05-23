import { useState } from 'react';

export type GameStatus = "betting" | "live" | "crashed";

export const useGameLogic = () => {
  // Purely static return to avoid any render loops
  const [status] = useState<GameStatus>("live");
  const [multiplier] = useState(2.13);
  const [countdown] = useState(0);
  const [crashPoint] = useState(4.48);
  const [history] = useState<number[]>([1.47, 12.33, 1.19, 3.05, 1.52, 18.61, 1.89]);

  return { status, multiplier, countdown, crashPoint, history };
};