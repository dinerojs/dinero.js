import { multiply as coreMultiply } from '../core';
import type { MultiplyParams } from '../core';

/**
 * Multiply the passed Dinero object.
 *
 * @param multiplicand - The Dinero object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function multiply<TAmount, TCurrency extends string>(
  ...[multiplicand, multiplier]: MultiplyParams<TAmount, TCurrency>
) {
  const { calculator } = multiplicand;
  const multiplyFn = coreMultiply(calculator);

  return multiplyFn(multiplicand, multiplier);
}
