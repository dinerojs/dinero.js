import type { MultiplyParams } from '@dinero.js/core';
import { multiply as coreMultiply } from '@dinero.js/core';

/**
 * Multiply the passed Dinero object.
 *
 * @param multiplier The Dinero object to multiply.
 * @param multiplicand The number to multiply with.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns A new Dinero object.
 */
export function multiply<TAmount>(
  ...[multiplier, multiplicand, options]: MultiplyParams<TAmount>
) {
  const _multiply = coreMultiply({ calculator: multiplier.calculator });

  return _multiply(multiplier, multiplicand, options);
}
