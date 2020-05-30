import { VariadicOperation } from "@dinero.js/core";
import { maximum, power, halfUp } from "@dinero.js/core/calculator/number";
import { countFractionDigits, isFloat } from "../helpers";

const getFactor = (n: number) => power(10, countFractionDigits(n));

const multiplyFloats: VariadicOperation<number> = (...values) => {
  const factor = maximum(...values.map((value) => getFactor(value)));

  return (
    values.reduce((acc, curr) => acc * halfUp(curr * factor), 0) /
    (factor * factor)
  );
};

/**
 * Returns the product of a set numbers.
 */
const multiply: VariadicOperation<number> = (...values) => {
  return values.some((value) => isFloat(value))
    ? multiplyFloats(...values)
    : values.reduce((acc, curr) => acc * curr, 0);
};

export default multiply;
