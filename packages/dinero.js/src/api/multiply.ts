import { multiply as coreMultiply } from '@dinero.js/core';
import type { MultiplyParams } from '@dinero.js/core';

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
export function multiply<TAmount>(
  ...[multiplicand, multiplier]: MultiplyParams<TAmount>
) {
  const { calculator } = multiplicand;
  const multiplyFn = coreMultiply(calculator);

  return multiplyFn(multiplicand, multiplier);
}
