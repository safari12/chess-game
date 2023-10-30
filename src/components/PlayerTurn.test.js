import { render } from "@testing-library/react";
import React from "react";
import { PlayerTurn } from "./PlayerTurn";

const mockGame = (player) => ({
  turn: () => player,
});

describe("PlayerTurn", () => {
  it("should display white player turn", () => {
    const { getByText } = render(<PlayerTurn game={mockGame("w")} />);
    expect(getByText("White's Turn")).toBeInTheDocument();
  });
  it("should display black player turn", () => {
    const { getByText } = render(<PlayerTurn game={mockGame("b")} />);
    expect(getByText("Black's Turn")).toBeInTheDocument();
  });
});
