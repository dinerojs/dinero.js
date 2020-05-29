import { RoundingMode } from "@dinero.js/core";
import { isHalf } from "../helpers";

/**
 * Rounds half values down.
 */
const halfDown: RoundingMode<number> = (n) => {
  return isHalf(n) ? Math.floor(n) : Math.round(n);
};

export default halfDown;
