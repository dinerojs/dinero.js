import { RoundingMode } from "@dinero.js/core";
import { isHalf } from "../helpers";

/**
 * Rounds half values to nearest integer closest to zero.
 */
const halfTowardsZero: RoundingMode<number> = (n) => {
  return isHalf(n) ? Math.sign(n) * Math.floor(Math.abs(n)) : Math.round(n);
};

export default halfTowardsZero;
