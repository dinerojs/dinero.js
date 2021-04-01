import { createUnsafeAdd, createSafeAdd } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  halfEven,
  subtract,
  zero,
} from '@dinero.js/calculator/number';

/**
 * Unsafely add up the passed Dinero objects.
 *
 * @param augend The Dinero object to add to.
 * @param addend The Dinero object to add.
 *
 * @returns A new Dinero object.
 */
export const unsafeAdd = createUnsafeAdd({ add });

/**
 * Add up the passed Dinero objects.
 *
 * @param augend The Dinero object to add to.
 * @param addend The Dinero object to add.
 *
 * @returns A new Dinero object.
 */
export const safeAdd = createSafeAdd({
  add,
  compare,
  multiply,
  power,
  round: halfEven,
  subtract,
  zero,
});
