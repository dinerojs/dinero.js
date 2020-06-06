import maximum from "../maximum";

describe("maximum", () => {
  it("gets the greatest from positive numbers", () => {
    expect(maximum(5n, 3n, 2n)).toBe(5n);
  });
  it("gets the greatest from negative numbers", () => {
    expect(maximum(-5n, -4n, -2n)).toBe(-2n);
  });
});
