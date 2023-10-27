import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { useState } from "react";
import "./App.css";
import { GameStatus } from "./components/GameStatus";

function App() {
  const [game, setGame] = useState(new Chess());
  const [kingPos, setKingPos] = useState({
    w: "e1",
    b: "e8",
  });

  const handleMove = ({ sourceSquare, targetSquare }) => {
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
      setGame(new Chess(game.fen()));
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
    <div className="App">
      <div className="overlay-container">
        <Chessboard
          position={game.fen()}
          onDrop={handleMove}
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
        <GameStatus game={game} />
      </div>
    </div>
  );
}

export default App;
