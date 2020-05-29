import { VariadicOperation } from "@dinero.js/core";
import { countFractionDigits, isFloat } from "../helpers";

const getFactor = (n: number) => Math.pow(10, countFractionDigits(n));

const multiplyFloats: VariadicOperation<number> = (...values) => {
  const factor = Math.max(...values.map((value) => getFactor(value)));

  return (
    values.reduce((acc, curr) => acc * Math.round(curr * factor), 0) /
    (factor * factor)
  );
};

/**
 * Returns the product of two numbers.
 */
const multiply: VariadicOperation<number> = (...values) => {
  return values.some((value) => isFloat(value))
    ? multiplyFloats(...values)
    : values.reduce((acc, curr) => acc * curr, 0);
};

export default multiply;
