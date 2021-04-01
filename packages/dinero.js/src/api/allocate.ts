import { createUnsafeAllocate, createSafeAllocate } from '@dinero.js/core';
import {
  add,
  compare,
  divide,
  increment,
  multiply,
  subtract,
  zero,
  down,
} from '@dinero.js/calculator/number';

const calculator = {
  add,
  compare,
  divide,
  increment,
  multiply,
  subtract,
  zero,
  round: down,
};

/**
 * Unsafely distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject The Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 */
export const unsafeAllocate = createUnsafeAllocate(calculator);

/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject The Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 */
export const safeAllocate = createSafeAllocate(calculator);
