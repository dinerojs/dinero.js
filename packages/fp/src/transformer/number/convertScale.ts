import { RoundingMode } from '@dinero.js/core';
import {
  multiply,
  power,
  subtract,
  halfEven,
} from '@dinero.js/core/calculator/number';
import { FunctionalDinero, createFunctionalDinero } from '@dinero.js/fp';

/**
 * Convert a set of functional Dinero objects to a new precision.
 *
 * @param functionalDinero The functional Dinero object to convert.
 * @param newScale The new precision.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new set of functional Dinero objects.
 */
function convertScale(
  functionalDinero: FunctionalDinero<number>,
  newScale: number,
  roundingMode: RoundingMode<number> = halfEven
) {
  const { amount, currency, scale } = functionalDinero.toJSON();

  return createFunctionalDinero({
    amount: roundingMode(
      multiply(amount, power(currency.base, subtract(newScale, scale)))
    ),
    currency,
    scale: newScale,
  });
}

export default convertScale;
