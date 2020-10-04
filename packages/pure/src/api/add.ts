import {
  unsafeAdd as coreUnsafeAdd,
  safeAdd as coreSafeAdd,
} from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  halfEven,
  subtract,
  zero,
} from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

/**
 * Unsafely add up the passed pure Dinero objects.
 *
 * @param augend The pure Dinero object to add to.
 * @param addend The pure Dinero object to add.
 *
 * @returns A new pure Dinero object.
 */
export const unsafeAdd = buildMethod(coreUnsafeAdd, { add });

/**
 * Add up the passed pure Dinero objects.
 *
 * @param augend The pure Dinero object to add to.
 * @param addend The pure Dinero object to add.
 *
 * @returns A new pure Dinero object.
 */
export const safeAdd = buildMethod(coreSafeAdd, {
  add,
  compare,
  multiply,
  power,
  round: halfEven,
  subtract,
  zero,
});
