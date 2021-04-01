import { createNormalizeScale } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/calculator/number';

/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 */
export const normalizeScale = createNormalizeScale({
  add,
  compare,
  zero,
  multiply,
  power,
  subtract,
  round: halfEven,
});
