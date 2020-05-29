import { BinaryOperation } from "@dinero.js/core";
import { multiply, divide } from "@dinero.js/core/calculator/number";

/**
 * Returns the percentage of a number.
 */
const percentage: BinaryOperation<number> = (n: number, percentage: number) => {
  return divide(multiply(n, percentage), 100);
};

export default percentage;
