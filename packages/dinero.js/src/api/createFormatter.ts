import {
  Transformer,
  FormatOptions,
  Dinero,
  createToFormat,
} from '@dinero.js/core';
import {
  multiply,
  divide,
  power,
  halfEven,
} from '@dinero.js/calculator/number';

const formatter = createToFormat({
  multiply,
  divide,
  power,
  round: halfEven,
});

/**
 * Create a pure Dinero object formatter.
 *
 * @param transformer A transformer function.
 * @param formatOptions Formatting options for the amount transformer.
 *
 * @returns A formatter function.
 */
export function createFormatter(
  transformer: Transformer<number>,
  { digits, roundingMode }: FormatOptions<number> = {}
) {
  return function toFormat(dineroObject: Dinero<number>) {
    return formatter(dineroObject, transformer, { digits, roundingMode });
  };
}
