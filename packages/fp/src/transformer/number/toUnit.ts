import { divide, power } from '@dinero.js/core/calculator/number';
import { FunctionalDinero } from '@dinero.js/fp';

/**
 * Get the amount of a functional Dinero object in units.
 *
 * @param functionalDinero The functional Dinero object to transform.
 *
 * @returns The amount in units.
 */
function toUnit(functionalDinero: FunctionalDinero<number>) {
  const { amount, currency, scale } = functionalDinero.toJSON();

  return divide(amount, power(currency.base, scale));
}

export default toUnit;
