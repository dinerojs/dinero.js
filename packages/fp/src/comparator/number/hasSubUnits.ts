import { modulo, power, areEqual } from '@dinero.js/core/calculator/number';
import { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Check whether a functional Dinero object has minor currency units.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object has minor currency units.
 */
function hasSubUnits(functionalDinero: FunctionalDinero<number>) {
  const { amount, currency, scale } = toSnapshot(functionalDinero);
  const remainder = modulo(amount, power(currency.base, scale));

  return !areEqual(remainder, 0);
}

export default hasSubUnits;
