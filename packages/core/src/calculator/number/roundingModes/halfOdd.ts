import { RoundingMode } from "@dinero.js/core";
import { isEven, isHalf } from "../helpers";

/**
 * Round a number with half values to nearest odd integer.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
const halfOdd: RoundingMode<number> = (value) => {
  const rounded = Math.round(value);

  if (!isHalf(value)) {
    return rounded;
  }

  return isEven(rounded) ? rounded - 1 : rounded;
};

export default halfOdd;
