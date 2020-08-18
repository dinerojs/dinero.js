import { toFormat } from '@dinero.js/core';
import { multiply, divide, power, halfEven } from '@dinero.js/core/calculator';

/**
 * Format a pure Dinero object.
 *
 * @param dineroObject The pure Dinero object to format.
 * @param transformer A transformer function.
 * @param formatOptions Formatting options for the amount transformer.
 *
 * @returns A formatted pure Dinero object.
 */
const pureToFormat = toFormat({
  multiply,
  divide,
  power,
  round: halfEven,
});

export default pureToFormat;
