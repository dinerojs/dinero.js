import { RoundingMode } from "@dinero.js/core";

/**
 * Round a number down.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
const down: RoundingMode<number> = (value) => {
  return Math.floor(value);
};

export default down;
