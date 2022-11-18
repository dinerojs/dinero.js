import { toDecimal as coreToDecimal } from '@dinero.js/core';
import type { ToDecimalParams } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in decimal form.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in decimal form.
 *
 * @public
 */
export function toDecimal<TAmount, TOutput>(
  ...[dineroObject, transformer]: ToDecimalParams<TAmount, TOutput>
) {
  const { calculator } = dineroObject;
  const toDecimalFn = coreToDecimal<TAmount, TOutput>(calculator);

  return toDecimalFn(dineroObject, transformer);
}
