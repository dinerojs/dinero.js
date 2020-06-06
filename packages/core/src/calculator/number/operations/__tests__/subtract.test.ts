import subtract from "../subtract";

describe("subtract", () => {
  it("subtracts positive numbers", () => {
    expect(subtract(1, 2, 3)).toBe(-4);
  });
  it("subtracts negative numbers", () => {
    expect(subtract(-1, -2, -3)).toBe(4);
  });
  it("subtracts floats", () => {
    expect(subtract(1.5, 2.5, 3.5)).toBe(-4.5);
  });
  it("subtracts numbers in scientific notation", () => {
    expect(subtract(1e5, 2e5, 3e5)).toBe(-400000);
  });
});
