import { FunctionalDinero } from '@dinero.js/fp';

/**
 * Check whether a functional Dinero object is positive.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is positive.
 */
function isPositive(functionalDinero: FunctionalDinero<number>) {
  const { amount } = functionalDinero.toJSON();

  return amount >= 0;
}

export default isPositive;
