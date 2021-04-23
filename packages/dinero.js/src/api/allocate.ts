import type { AllocateParams } from '@dinero.js/core';
import { safeAllocate } from '@dinero.js/core';

/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject The Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns A new Dinero object.
 */
export function allocate<TAmount>(
  ...[dineroObject, ratios, options]: AllocateParams<TAmount>
) {
  const { calculator } = dineroObject;
  const allocateFn = safeAllocate({ calculator });

  return allocateFn(dineroObject, ratios, options);
}
