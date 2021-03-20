import {
  toFormat as coreToFormat,
  Transformer,
  FormatOptions,
} from '@dinero.js/core';
import { multiply, divide, power, halfEven } from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';
import { PureDinero } from '../types';

const formatter = buildMethod(coreToFormat, {
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
  return function toFormat(dineroObject: PureDinero<number>) {
    return formatter(dineroObject, transformer, { digits, roundingMode });
  };
}
