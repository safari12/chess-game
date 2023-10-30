import Chessboard from "chessboardjsx";

import "./Board.css";

export const Board = ({ game, checkedKing, onMove }) => {
  const calcBoardWidth = ({ screenWidth }) => {
    return screenWidth / 3;
  };

  return (
    <Chessboard
      position={game.fen()}
      onDrop={onMove}
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
  );
};
