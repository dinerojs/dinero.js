import { RoundingMode } from "@dinero.js/core";
import { isHalf } from "../helpers";

/**
 * Rounds half values to nearest integer farthest from zero.
 */
const halfAwayFromZero: RoundingMode<number> = (n) => {
  return isHalf(n) ? Math.sign(n) * Math.ceil(Math.abs(n)) : Math.round(n);
};

export default halfAwayFromZero;
