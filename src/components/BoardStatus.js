import React, { useEffect, useRef, useState } from "react";
import "./BoardStatus.css";

export const BoardStatus = ({ game, onReset }) => {
  const statusRef = useRef(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let currentStatus = null;

    if (game.isCheckmate()) {
      currentStatus = "checkmate";
    } else if (game.inCheck()) {
      currentStatus = "check";
    } else if (game.isDraw()) {
      currentStatus = "draw";
    } else if (game.isStalemate()) {
      currentStatus = "stalemate";
    }

    setStatus(currentStatus);

    const handleAnimEnd = (event) => {
      if (event.animationName === "shrink") {
        setStatus(null);
      }
    };

    const statusNode = statusRef.current;
    if (statusNode && currentStatus === "check") {
      statusNode.addEventListener("animationend", handleAnimEnd);

      return () => {
        statusNode.removeEventListener("animationend", handleAnimEnd);
      };
    }
  }, [game]);

  const getStatusMessage = () => {
    switch (status) {
      case "check":
        return "CHECK!";
      case "checkmate":
        const winner = game.turn() === "w" ? "Black" : "White";
        return `CHECKMATE!\n${winner} WINS!`;
      case "draw":
        return "DRAW!";
      case "stalemate":
        return "STALEMATE";
      default:
        return "";
    }
  };

  return status ? (
    <>
      <div className="board-status-dark-overlay"></div>
      <div ref={statusRef} className={`board-status board-status-${status}`}>
        {getStatusMessage()}
        {game.isGameOver() && (
          <button onClick={onReset} className="board-status-reset-btn">
            Reset Game
          </button>
        )}
      </div>
    </>
  ) : null;
};
