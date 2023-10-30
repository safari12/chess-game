import React, { useEffect, useRef, useState } from "react";
import "./BoardStatus.css";

export const BoardStatus = ({ game, onReset }) => {
  const statusRef = useRef(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (game.isCheckmate()) {
      setStatus("checkmate");
    } else if (game.inCheck()) {
      setStatus("check");
    } else if (game.isDraw()) {
      setStatus("draw");
    } else if (game.isStalemate()) {
      setStatus("stalemate");
    } else {
      setStatus(null);
    }
  }, [game]);

  useEffect(() => {
    const handleAnimEnd = (event) => {
      if (event.animationName === "shrink") {
        setStatus(null);
      }
    };

    const statusNode = statusRef.current;
    if (statusNode) {
      if (status === "check") {
        statusNode.addEventListener("animationend", handleAnimEnd);
      } else {
        statusNode.removeEventListener("animationend", handleAnimEnd);
      }
    }

    return () => {
      if (statusNode) {
        statusNode.removeEventListener("animationend", handleAnimEnd);
      }
    };
  }, [status]);

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

  return (
    <>
      {status && (
        <>
          <div className="board-status-dark-overlay"></div>
          <div
            ref={statusRef}
            className={`board-status board-status-${status}`}
          >
            {getStatusMessage()}
            {game.isGameOver() && (
              <button onClick={onReset} className="board-status-reset-btn">
                Reset Game
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
