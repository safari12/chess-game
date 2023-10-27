import React, { useEffect, useRef, useState } from "react";
import "./GameStatus.css";

export const GameStatus = ({ game }) => {
  const statusRef = useRef(null);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    setShowStatus(game.inCheck());
  }, [game]);

  useEffect(() => {
    console.log(showStatus);
    const handleAnimEnd = (event) => {
      if (event.animationName === "shrink") {
        setShowStatus(false);
      }
    };

    const statusNode = statusRef.current;
    if (statusNode) {
      if (showStatus) {
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
  }, [showStatus]);

  return (
    <>
      {showStatus && (
        <>
          <div className="dark-overlay"></div>
          <div ref={statusRef} className="game-status game-status-check">
            CHECK!
          </div>
        </>
      )}
    </>
  );
};
