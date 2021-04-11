import {
  createUnsafeAllocate,
  createSafeAllocate,
  Dinero,
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
  dineroObject: Dinero<TAmount>,
  ratios: readonly TAmount[]
) {
  const allocate = createUnsafeAllocate(dineroObject.calculator);

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
  dineroObject: Dinero<TAmount>,
  ratios: readonly TAmount[]
) {
  const allocate = createSafeAllocate(dineroObject.calculator);

  return allocate(dineroObject, ratios);
}
