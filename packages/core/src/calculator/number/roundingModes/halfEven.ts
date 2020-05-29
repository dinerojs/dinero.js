import { RoundingMode } from "@dinero.js/core";
import { isEven, isHalf } from "../helpers";

/**
 * Rounds half values to nearest even integer.
 */
const halfEven: RoundingMode<number> = (n) => {
  const rounded = Math.round(n);

  if (!isHalf(n)) {
    return rounded;
  }

  return isEven(rounded) ? rounded : rounded - 1;
};

export default halfEven;
