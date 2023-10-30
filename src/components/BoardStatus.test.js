import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BoardStatus } from "./BoardStatus";

// Mock the chess.js object
const mockGame = (status) => ({
  isCheckmate: jest.fn().mockReturnValue(status === "checkmate"),
  inCheck: jest.fn().mockReturnValue(status === "check"),
  isDraw: jest.fn().mockReturnValue(status === "draw"),
  isStalemate: jest.fn().mockReturnValue(status === "stalemate"),
  turn: jest.fn().mockReturnValue("w"),
  isGameOver: jest.fn().mockReturnValue(status === "checkmate"),
});

describe("<BoardStatus />", () => {
  test("renders CHECK status", () => {
    const { getByText } = render(
      <BoardStatus game={mockGame("check")} onReset={() => {}} />
    );
    expect(getByText("CHECK!")).toBeInTheDocument();
  });

  test("renders CHECKMATE status and winner", () => {
    const { getByText } = render(
      <BoardStatus game={mockGame("checkmate")} onReset={() => {}} />
    );
    expect(getByText(/CHECKMATE!/)).toBeInTheDocument();
    expect(getByText(/Black WINS!/)).toBeInTheDocument();
  });

  test("renders DRAW status", () => {
    const { getByText } = render(
      <BoardStatus game={mockGame("draw")} onReset={() => {}} />
    );
    expect(getByText("DRAW!")).toBeInTheDocument();
  });

  test("renders STALEMATE status", () => {
    const { getByText } = render(
      <BoardStatus game={mockGame("stalemate")} onReset={() => {}} />
    );
    expect(getByText("STALEMATE")).toBeInTheDocument();
  });

  test("renders reset button on checkmate", () => {
    const onReset = jest.fn();
    const { getByText } = render(
      <BoardStatus game={mockGame("checkmate")} onReset={onReset} />
    );
    fireEvent.click(getByText("Reset Game"));
    expect(onReset).toHaveBeenCalled();
  });
});
