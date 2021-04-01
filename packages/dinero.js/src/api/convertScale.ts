import { createConvertScale } from '@dinero.js/core';
import {
  multiply,
  power,
  subtract,
  halfEven,
} from '@dinero.js/calculator/number';

/**
 * Convert a Dinero object to a new precision.
 *
 * @param dineroObject The Dinero object to convert.
 * @param newScale The new precision.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new Dinero object.
 */
export const convertScale = createConvertScale({
  subtract,
  multiply,
  power,
  round: halfEven,
});
