import type {
  AddParams} from '@dinero.js/core';
import {
  safeAdd as coreSafeAdd,
  unsafeAdd as coreUnsafeAdd
} from '@dinero.js/core';

/**
 * Unsafely add up the passed Dinero objects.
 *
 * @param augend The Dinero object to add to.
 * @param addend The Dinero object to add.
 *
 * @returns A new Dinero object.
 */
export function unsafeAdd<TAmount>(...[augend, addend]: AddParams<TAmount>) {
  const add = coreUnsafeAdd({ calculator: augend.calculator });

  return add(augend, addend);
}

/**
 * Add up the passed Dinero objects.
 *
 * @param augend The Dinero object to add to.
 * @param addend The Dinero object to add.
 *
 * @returns A new Dinero object.
 */
export function safeAdd<TAmount>(...[augend, addend]: AddParams<TAmount>) {
  const add = coreSafeAdd({ calculator: augend.calculator });

  return add(augend, addend);
}
