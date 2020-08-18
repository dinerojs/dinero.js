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
 * Normalize a set of pure Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects The pure Dinero objects to normalize.
 *
 * @returns A new set of pure Dinero objects.
 */
const pureNormalizeScale = normalizeScale(dinero, {
  add,
  compare,
  zero,
  multiply,
  power,
  subtract,
  round: halfEven,
});

export default pureNormalizeScale;
