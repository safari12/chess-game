import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { useState } from "react";

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
      alert("Invalid move!");
    }
  };

  return (
    <div className="App">
      <Chessboard
        position={game.fen()}
        onDrop={handleMove}
        width={400}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
        }}
      />
    </div>
  );
}

export default App;
