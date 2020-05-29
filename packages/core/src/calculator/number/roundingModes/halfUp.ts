import { RoundingMode } from "@dinero.js/core";

/**
 * Rounds half values up.
 */
const halfUp: RoundingMode<number> = (n) => {
  return Math.round(n);
};

export default halfUp;
