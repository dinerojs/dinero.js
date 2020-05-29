import { RoundingMode } from "@dinero.js/core";
import { isEven, isHalf } from "../helpers";

/**
 * Rounds half values to nearest odd integer.
 */
const halfOdd: RoundingMode<number> = (n) => {
  const rounded = Math.round(n);

  if (!isHalf(n)) {
    return rounded;
  }

  return isEven(rounded) ? rounded - 1 : rounded;
};

export default halfOdd;
