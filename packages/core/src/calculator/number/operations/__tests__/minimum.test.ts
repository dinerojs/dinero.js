import minimum from "../minimum";

describe("minimum", () => {
  it("gets the lowest from positive numbers", () => {
    expect(minimum(5, 3, 2)).toBe(2);
  });
  it("gets the lowest from negative numbers", () => {
    expect(minimum(-5, -4, -2)).toBe(-5);
  });
  it("gets the lowest from floats", () => {
    expect(minimum(10.5, 2.5, 1.6)).toBe(1.6);
  });
  it("gets the lowest from numbers in scientific notation", () => {
    expect(minimum(4e5, 3e5, 2e5)).toBe(2e5);
  });
});
