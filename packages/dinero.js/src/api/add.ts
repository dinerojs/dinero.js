import { createUnsafeAdd, createSafeAdd, Dinero } from '@dinero.js/core';

/**
 * Unsafely add up the passed Dinero objects.
 *
 * @param augend The Dinero object to add to.
 * @param addend The Dinero object to add.
 *
 * @returns A new Dinero object.
 */
export function unsafeAdd<TAmount>(
  augend: Dinero<TAmount>,
  addend: Dinero<TAmount>
) {
  const add = createUnsafeAdd(augend.calculator);

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
export function safeAdd<TAmount>(
  augend: Dinero<TAmount>,
  addend: Dinero<TAmount>
) {
  const add = createSafeAdd(augend.calculator);

  return add(augend, addend);
}
