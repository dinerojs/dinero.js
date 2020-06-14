import { areEqual } from '@dinero.js/core/calculator/number';
import { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Check whether the value of a functional Dinero object is zero.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the value of a functional Dinero object is zero.
 */
function isZero(functionalDinero: FunctionalDinero<number>) {
  const { amount } = toSnapshot(functionalDinero);

  return areEqual(amount, 0);
}

export default isZero;
