import { BinaryOperation } from "@dinero.js/core";

/**
 * Returns an number to the power of an exponent.
 */
const power: BinaryOperation<number> = (n, exponent) => {
  return n ** exponent;
};

export default power;
