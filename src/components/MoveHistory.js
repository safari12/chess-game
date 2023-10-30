import React from "react";

import "./MoveHistory.css";

export const MoveHistory = ({ history }) => {
  const whiteMoves = history["w"];
  const blackMoves = history["b"];

  const displayMoves = (moves) => (
    <div>
      {moves.map(({ targetSquare, piece }, index) => (
        <div
          style={{ marginTop: 12 }}
          key={index}
        >{`${piece}-${targetSquare}`}</div>
      ))}
    </div>
  );

  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="move-history-turns">
        <div className="column">
          <h4>White</h4>
          {whiteMoves && displayMoves(whiteMoves)}
        </div>
        <div className="column">
          <h4>Black</h4>
          {blackMoves && displayMoves(blackMoves)}
        </div>
      </div>
    </div>
  );
};
