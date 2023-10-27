import React from "react";

import "./PlayerTurn.css";

export const PlayerTurn = ({ game }) => {
  const message = game.turn() === "w" ? "White's Turn" : "Black's Turn";
  return <div className="player-turn">{message}</div>;
};
