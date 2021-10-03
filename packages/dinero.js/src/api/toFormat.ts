import { toFormat as coreToFormat } from '@dinero.js/core';
import type { ToFormatParams } from '@dinero.js/core';

/**
 * Format a Dinero object with a custom transformer.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The formatted object.
 */
export function toFormat<TAmount, TOutput>(
  ...[dineroObject, transformer]: ToFormatParams<TAmount, TOutput>
) {
  const { calculator } = dineroObject;

  const formatter = coreToFormat<TAmount, TOutput>(calculator);

  return formatter(dineroObject, transformer);
}
