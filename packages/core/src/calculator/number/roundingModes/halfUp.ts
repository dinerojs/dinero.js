import { RoundingMode } from '@dinero.js/core';

/**
 * Round a number with half values up.
 *
 * @param value The number to round.
 *
 * @returns The rounded number.
 */
const halfUp: RoundingMode<number> = (value) => {
  return Math.round(value);
};

export default halfUp;
