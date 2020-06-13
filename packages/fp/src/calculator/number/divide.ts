import { RoundingMode } from '@dinero.js/core';
import {
  divide as divideNumbers,
  halfEven,
} from '@dinero.js/core/calculator/number';
import dinero, { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Divide the passed functional Dinero object.
 *
 * @param functionalDinero The functional Dinero object to divide.
 * @param divisor The number to divide with.
 *
 * @returns A new functional Dinero object.
 */
function divide(
  functionalDinero: FunctionalDinero<number>,
  divisor: number,
  roundingMode: RoundingMode<number> = halfEven
) {
  const { amount: rawAmount, currency, scale } = toSnapshot(functionalDinero);
  const amount = roundingMode(divideNumbers(rawAmount, divisor));

  return dinero({
    amount,
    currency,
    scale,
  });
}

export default divide;
