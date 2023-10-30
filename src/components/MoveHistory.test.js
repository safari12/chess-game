import React from "react";
import { MoveHistory } from "./MoveHistory";
import { render } from "@testing-library/react";

const mockHistory = {
  b: [
    {
      targetSquare: "e3",
      piece: "p",
    },
  ],
  w: [
    {
      targetSquare: "e5",
      piece: "k",
    },
  ],
};

describe("Move History", () => {
  it("should display black and white moves", () => {
    const { getByText } = render(<MoveHistory history={mockHistory} />);
    expect(getByText("p-e3")).toBeInTheDocument();
    expect(getByText("k-e5")).toBeInTheDocument();
  });
});
