import modulo from "../modulo";

describe("modulo", () => {
  it("performs a modulo with positive numbers", () => {
    expect(modulo(5, 3, 2)).toBe(0);
  });
  it("performs a modulo with negative numbers", () => {
    expect(modulo(-5, -4, -2)).toBe(-1);
  });
  it("performs a modulo with floats", () => {
    expect(modulo(10.5, 2.5, 1.6)).toBe(0.5);
  });
  it("performs a modulo with numbers in scientific notation", () => {
    expect(modulo(4e5, 3e5, 2e5)).toBe(100000);
  });
});
