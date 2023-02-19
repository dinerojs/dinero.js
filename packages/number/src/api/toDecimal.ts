import { calculator } from '../calculator';

import { toDecimal as coreToDecimal } from '@dinero.js/core';
import type { ToDecimalParams, Dinero, Transformer } from '@dinero.js/core';

export function toDecimal(dineroObject: Dinero<number>): string;

export function toDecimal<TOutput>(
  dineroObject: Dinero<number>,
  transformer: Transformer<number, TOutput, string>
): TOutput;

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
export function toDecimal<TOutput>(
  ...[dineroObject, transformer]: ToDecimalParams<number, TOutput>
) {
  const toDecimalFn = coreToDecimal<number, TOutput>(calculator);

  return toDecimalFn(dineroObject, transformer);
}
