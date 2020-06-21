import { toFormat } from '@dinero.js/core';
import {
  multiply,
  divide,
  power,
  halfEven,
} from '@dinero.js/core/calculator/number';

/**
 * Format a functional Dinero object.
 *
 * @param dineroObject The functional Dinero object to format.
 * @param transformer A transformer function.
 * @param formatOptions Formatting options for the amount transformer.
 *
 * @returns A formatted functional Dinero object.
 */
const functionalToFormat = toFormat({
  multiply,
  divide,
  power,
  round: halfEven,
});

export default functionalToFormat;
