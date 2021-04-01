import { createToRoundedUnit } from '@dinero.js/core';
import {
  multiply,
  divide,
  power,
  halfEven,
} from '@dinero.js/calculator/number';

/**
 * Get the amount of a Dinero object in rounded units.
 *
 * @param dineroObject The Dinero object to transform.
 * @param digits The number of fraction digits to round to.
 * @param roundingMode The rounding mode to use.
 *
 * @returns The amount in rounded units.
 */
export const toRoundedUnit = createToRoundedUnit({
  multiply,
  divide,
  power,
  round: halfEven,
});
