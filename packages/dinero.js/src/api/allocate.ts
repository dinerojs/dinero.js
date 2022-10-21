import { safeAllocate } from '@dinero.js/core';
import type { AllocateParams } from '@dinero.js/core';

/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject - The Dinero object to allocate from.
 * @param ratios - The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function allocate<TAmount>(
  ...[dineroObject, ratios]: AllocateParams<TAmount>
) {
  const { calculator } = dineroObject;
  const allocateFn = safeAllocate(calculator);

  return allocateFn(dineroObject, ratios);
}
