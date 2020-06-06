import add from "../add";

describe("add", () => {
  it("adds up positive numbers", () => {
    expect(add(1, 2, 3)).toBe(6);
  });
  it("adds up negative numbers", () => {
    expect(add(-1, -2, -3)).toBe(-6);
  });
  it("adds up floats", () => {
    expect(add(1.5, 2.5, 3.5)).toBe(7.5);
  });
  it("adds up numbers in scientific notation", () => {
    expect(add(1e5, 2e5, 3e5)).toBe(600000);
  });
});
