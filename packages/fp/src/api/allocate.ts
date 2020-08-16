import { allocate, BaseDinero } from '@dinero.js/core';
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
import dinero from '../dinero';

/**
 * Distribute the amount of a functional Dinero object across a list of ratios.
 *
 * @param dineroObject The functional Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new functional Dinero object.
 */
function functionalAllocate(
  dineroObject: BaseDinero<number>,
  ratios: readonly number[]
) {
  return allocate(dinero, {
    add,
    compare,
    divide,
    increment,
    multiply,
    subtract,
    zero,
  })(dineroObject, ratios, down);
}

export default functionalAllocate;
