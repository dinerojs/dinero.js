import { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Check whether a functional Dinero object is negative.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is negative.
 */
function isNegative(functionalDinero: FunctionalDinero<number>) {
  const { amount } = toSnapshot(functionalDinero);

  return amount < 0;
}

export default isNegative;
