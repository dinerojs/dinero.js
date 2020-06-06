import { FunctionalDinero } from '@dinero.js/fp';

/**
 * Check whether a functional Dinero object is negative.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is negative.
 */
function isNegative(functionalDinero: FunctionalDinero<number>) {
  const { amount } = functionalDinero.toJSON();

  return amount < 0;
}

export default isNegative;
