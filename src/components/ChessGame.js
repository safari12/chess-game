import { Chess } from "chess.js";
import React, { useState } from "react";
import { PlayerTurn } from "./PlayerTurn";
import { Board } from "./Board";
import { BoardStatus } from "./BoardStatus";
import { MoveHistory } from "./MoveHistory";

import "./ChessGame.css";

export const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState({});
  const [kingPos, setKingPos] = useState({
    w: "e1",
    b: "e8",
  });

  const handleMove = ({ sourceSquare, targetSquare }) => {
    try {
      const turn = game.turn();
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

      const moves = history[turn] || [];
      setHistory({
        ...history,
        [turn]: [...moves, { targetSquare, piece: move.piece }],
      });
    } catch (error) {
      console.log("Invalid move");
    }
  };

  const handleReset = () => {
    setGame(new Chess());
    setHistory({});
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
    <div className="chess-game">
      <div className="chess-game-board">
        <PlayerTurn game={game} />
        <div className="chess-game-board-overlay">
          <Board game={game} checkedKing={checkedKing} onMove={handleMove} />
          <BoardStatus game={game} onReset={handleReset} />
        </div>
      </div>
      <MoveHistory history={history} />
    </div>
  );
};
