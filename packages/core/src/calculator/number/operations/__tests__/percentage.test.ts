import percentage from "../percentage";

describe("percentage", () => {
  it("calculates the percentage of a positive number", () => {
    expect(percentage(200, 50)).toBe(100);
  });
  it("calculates the percentage of a negative number", () => {
    expect(percentage(-200, 50)).toBe(-100);
  });
  it("calculates the percentage of a float", () => {
    expect(percentage(200.5, 50)).toBe(100.25);
  });
  it("calculates the percentage of a number in scientific notation", () => {
    expect(percentage(1e5, 50)).toBe(50000);
  });
});
