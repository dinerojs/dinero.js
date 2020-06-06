import { BinaryOperation } from "@dinero.js/core";
import { multiply, divide } from "@dinero.js/core/calculator/number";

/**
 * Returns the percentage of a number.
 *
 * @param value The number to calculate a percentage from.
 * @param percentage The percentage to calculate.
 *
 * @returns The percentage of the number.
 */
const percentage: BinaryOperation<number> = (value, percentage) => {
  return divide(multiply(value, percentage), 100);
};

export default percentage;
