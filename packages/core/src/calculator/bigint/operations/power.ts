import { BinaryOperation } from "@dinero.js/core";

/**
 * Returns an bigint to the power of an exponent.
 */
const power: BinaryOperation<bigint> = (n, exponent) => {
  return n ** exponent;
};

export default power;
