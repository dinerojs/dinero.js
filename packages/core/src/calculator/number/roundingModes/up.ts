import { RoundingMode } from "@dinero.js/core";

/**
 * Rounds up.
 */
const up: RoundingMode<number> = (n) => {
  return Math.floor(n);
};

export default up;
