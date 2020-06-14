import { greaterThanOrEqual } from '@dinero.js/core/calculator/number';
import { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Check whether a functional Dinero object is positive.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is positive.
 */
function isPositive(functionalDinero: FunctionalDinero<number>) {
  const { amount } = toSnapshot(functionalDinero);

  return greaterThanOrEqual(amount, 0);
}

export default isPositive;
