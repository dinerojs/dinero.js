import { createUnsafeSubtract, createSafeSubtract } from '@dinero.js/core';
import {
  subtract,
  add,
  compare,
  multiply,
  power,
  halfEven,
  zero,
} from '@dinero.js/calculator/number';

/**
 * Unsafely subtract the passed Dinero objects.
 *
 * @param minuend The Dinero object to subtract from.
 * @param subtrahend The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 */
export const unsafeSubtract = createUnsafeSubtract({ subtract });

/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend The Dinero object to subtract from.
 * @param subtrahend The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 */
export const safeSubtract = createSafeSubtract({
  subtract,
  add,
  compare,
  multiply,
  power,
  round: halfEven,
  zero,
});
