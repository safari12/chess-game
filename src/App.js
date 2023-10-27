import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { useState } from "react";
import "./App.css";
import { GameStatus } from "./components/GameStatus";

function App() {
  const [game, setGame] = useState(new Chess());

  const handleMove = ({ sourceSquare, targetSquare }) => {
    try {
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      setGame(new Chess(game.fen()));
    } catch (error) {
      console.log("Invalid move");
    }
  };

  const calcBoardWidth = ({ screenWidth }) => {
    return screenWidth / 3;
  };

  return (
    <div className="App">
      <div className="overlay-container">
        <Chessboard
          position={game.fen()}
          onDrop={handleMove}
          calcWidth={calcBoardWidth}
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
