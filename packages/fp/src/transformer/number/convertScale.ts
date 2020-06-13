import { RoundingMode } from '@dinero.js/core';
import {
  multiply,
  power,
  subtract,
  halfEven,
} from '@dinero.js/core/calculator/number';
import { FunctionalDinero } from '../../..';
import { Dinero } from '../..';
import { toSnapshot } from '.';

/**
 * Convert a functional Dinero object to a new precision.
 *
 * @param functionalDinero The functional Dinero object to convert.
 * @param newScale The new precision.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new functional Dinero object.
 */
function convertScale(
  functionalDinero: FunctionalDinero<number>,
  newScale: number,
  roundingMode: RoundingMode<number> = halfEven
) {
  const { amount, currency, scale } = toSnapshot(functionalDinero);

  return Dinero({
    amount: roundingMode(
      multiply(amount, power(currency.base, subtract(newScale, scale)))
    ),
    currency,
    scale: newScale,
  });
}

export default convertScale;
