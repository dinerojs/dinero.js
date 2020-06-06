import subtract from "../subtract";

describe("subtract", () => {
  it("subtracts positive numbers", () => {
    expect(subtract(1n, 2n, 3n)).toBe(-4n);
  });
  it("subtracts negative numbers", () => {
    expect(subtract(-1n, -2n, -3n)).toBe(4n);
  });
});
