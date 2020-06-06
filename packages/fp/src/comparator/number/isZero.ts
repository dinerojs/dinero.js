import { FunctionalDinero } from '@dinero.js/fp';

/**
 * Check whether the value of a functional Dinero object is zero.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the value of a functional Dinero object is zero.
 */
function isZero(functionalDinero: FunctionalDinero<number>) {
  const { amount } = functionalDinero.toJSON();

  return amount === 0;
}

export default isZero;
