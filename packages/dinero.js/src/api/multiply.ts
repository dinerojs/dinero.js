import { createMultiply, Dinero, MultiplyOptions } from '@dinero.js/core';

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
  multiplier: Dinero<TAmount>,
  multiplicand: TAmount,
  options?: MultiplyOptions<TAmount>
) {
  const _multiply = createMultiply(multiplier.calculator);

  return _multiply(multiplier, multiplicand, options);
}
