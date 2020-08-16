import { normalizeScale } from '@dinero.js/core';
import {
  add,
  compare,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Normalize a set of functional Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects The functional Dinero objects to normalize.
 *
 * @returns A new set of functional Dinero objects.
 */
const functionalNormalizeScale = normalizeScale(dinero, {
  add,
  compare,
  zero,
  multiply,
  power,
  subtract,
  round: halfEven,
});

export default functionalNormalizeScale;
