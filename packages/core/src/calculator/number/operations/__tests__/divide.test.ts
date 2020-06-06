import divide from "../divide";

describe("divide", () => {
  it("divides positive numbers", () => {
    expect(divide(8, 4, 2)).toBe(1);
  });
  it("divides negative numbers", () => {
    expect(divide(-8, -4, -2)).toBe(-1);
  });
  it("divides floats", () => {
    expect(divide(10.5, 2.5, 1.6)).toBe(2.625);
  });
  it("divides numbers in scientific notation", () => {
    expect(divide(3e5, 2e5, 1e5)).toBe(0.000015);
  });
});
