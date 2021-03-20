import { convertScale as coreConvertScale } from '@dinero.js/core';
import {
  multiply,
  power,
  subtract,
  halfEven,
} from '@dinero.js/core/calculator';
import { createFunction } from '../helpers';

/**
 * Convert a pure Dinero object to a new precision.
 *
 * @param dineroObject The pure Dinero object to convert.
 * @param newScale The new precision.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new pure Dinero object.
 */
export const convertScale = createFunction(coreConvertScale, {
  subtract,
  multiply,
  power,
  round: halfEven,
});
