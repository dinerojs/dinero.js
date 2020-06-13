import { RoundingMode } from '@dinero.js/core';
import { multiply as multiplyNumbers, halfEven } from '@dinero.js/core/calculator/number';
import { Dinero, FunctionalDinero, toSnapshot } from '../..';

/**
 * Multiply the passed functional Dinero object.
 *
 * @param functionalDinero The functional Dinero object to multiply.
 * @param multiplier The number to multiply with.
 *
 * @returns A new functional Dinero object.
 */
function multiply(
  functionalDinero: FunctionalDinero<number>,
  multiplier: number,
  roundingMode: RoundingMode<number> = halfEven
) {
  const { amount: rawAmount, currency, scale } = toSnapshot(functionalDinero);
  const amount = roundingMode(multiplyNumbers(rawAmount, multiplier));

  return Dinero({
    amount,
    currency,
    scale,
  });
}

export default multiply;
