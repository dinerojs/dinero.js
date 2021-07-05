import { toFormat as coreToFormat } from '@dinero.js/core';

import type { ToFormatParams } from '@dinero.js/core';

/**
 * Format a Dinero object with a custom transformer.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 * @param options - Formatting options for the amount transformer.
 *
 * @returns The object as a formatted string.
 */
export function toFormat<TAmount>(
  ...[dineroObject, transformer, options]: ToFormatParams<TAmount>
) {
  const { calculator } = dineroObject;
  const formatter = coreToFormat({ calculator });

  return formatter(dineroObject, transformer, options);
}
