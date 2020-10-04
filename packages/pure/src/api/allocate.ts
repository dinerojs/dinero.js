import {
  unsafeAllocate as coreUnsafeAllocate,
  safeAllocate as coreSafeAllocate,
} from '@dinero.js/core';
import {
  add,
  compare,
  divide,
  increment,
  multiply,
  subtract,
  zero,
  down,
} from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

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
 * Unsafely distribute the amount of a pure Dinero object across a list of ratios.
 *
 * @param dineroObject The pure Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new pure Dinero object.
 */
export const unsafeAllocate = buildMethod(coreUnsafeAllocate, calculator);

/**
 * Distribute the amount of a pure Dinero object across a list of ratios.
 *
 * @param dineroObject The pure Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new pure Dinero object.
 */
export const safeAllocate = buildMethod(coreSafeAllocate, calculator);
