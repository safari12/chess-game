import Chessboard from "chessboardjsx";
import { useState } from "react";

import "./Board.css";
import { BoardStatus } from "./BoardStatus";

export const Board = ({ game, onReset, onMove }) => {
  const [kingPos, setKingPos] = useState({
    w: "e1",
    b: "e8",
  });

  const handleDrop = ({ sourceSquare, targetSquare }) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (move.piece === "k") {
        setKingPos({
          ...kingPos,
          [move.color]: move.to,
        });
      }
      onMove(game);
    } catch (error) {
      console.log("Invalid move");
    }
  };

  const calcBoardWidth = ({ screenWidth }) => {
    return screenWidth / 3;
  };

  const getCheckKing = () => {
    if (game.inCheck()) {
      const turn = game.turn();
      return kingPos[turn];
    }
    return null;
  };

  const checkedKing = getCheckKing();

  return (
    <div className="board">
      <Chessboard
        position={game.fen()}
        onDrop={handleDrop}
        calcWidth={calcBoardWidth}
        squareStyles={{
          [checkedKing]: {
            backgroundColor: "yellow",
          },
        }}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
        }}
      />
      <BoardStatus game={game} onReset={onReset} />
    </div>
  );
};