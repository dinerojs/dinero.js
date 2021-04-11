import type {
  AllocateParams} from '@dinero.js/core';
import {
  unsafeAllocate as coreUnsafeAllocate,
  safeAllocate as coreSafeAllocate
} from '@dinero.js/core';

/**
 * Unsafely distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject The Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 */
export function unsafeAllocate<TAmount>(
  ...[dineroObject, ratios]: AllocateParams<TAmount>
) {
  const allocate = coreUnsafeAllocate({ calculator: dineroObject.calculator });

  return allocate(dineroObject, ratios);
}

/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject The Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 */
export function safeAllocate<TAmount>(
  ...[dineroObject, ratios]: AllocateParams<TAmount>
) {
  const allocate = coreSafeAllocate({ calculator: dineroObject.calculator });

  return allocate(dineroObject, ratios);
}
