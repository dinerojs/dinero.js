import { convertScale } from '@dinero.js/core';
import {
  multiply,
  power,
  subtract,
  halfEven,
} from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Convert a functional Dinero object to a new precision.
 *
 * @param dineroObject The functional Dinero object to convert.
 * @param newScale The new precision.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new functional Dinero object.
 */
const functionalConvertScale = convertScale(dinero, {
  subtract,
  multiply,
  power,
  round: halfEven,
});

export default functionalConvertScale;
