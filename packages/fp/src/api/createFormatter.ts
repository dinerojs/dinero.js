import { toFormat, Transformer, FormatOptions } from '@dinero.js/core';
import { multiply, divide, power, halfEven } from '@dinero.js/core/calculator';
import { FunctionalDinero } from '../types';

/**
 * Create a functional Dinero object formatter.
 *
 * @param transformer A transformer function.
 * @param formatOptions Formatting options for the amount transformer.
 *
 * @returns A formatter function.
 */
function createFormatter(
  transformer: Transformer<number>,
  { digits, roundingMode }: FormatOptions<number> = {}
) {
  return (dineroObject: FunctionalDinero<number>) => {
    const formatter = toFormat<number, FunctionalDinero<number>>({
      multiply,
      divide,
      power,
      round: halfEven,
    });

    return formatter(dineroObject, transformer, { digits, roundingMode });
  };
}

export default createFormatter;
