import { normalizeScale } from '@dinero.js/core';
import {
  add,
  maximum,
  multiply,
  power,
  subtract,
  halfEven,
  zero,
} from '@dinero.js/core/calculator/number';
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
  maximum,
  zero,
  multiply,
  power,
  subtract,
  round: halfEven,
});

export default functionalNormalizeScale;
