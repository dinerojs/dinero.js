import { RoundingMode } from "@dinero.js/core";

/**
 * Rounds down.
 */
const down: RoundingMode<number> = (n) => {
  return Math.floor(n);
};

export default down;
