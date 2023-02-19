/* eslint-disable functional/no-expression-statement */
import { calculator } from '@dinero.js/calculator-number';
import {
  createDinero,
  assert,
  INVALID_AMOUNT_MESSAGE,
  INVALID_SCALE_MESSAGE,
} from '@dinero.js/core';

/**
 * Create a Dinero object.
 *
 * @param options.amount - The amount in minor currency units.
 * @param options.currency - The currency.
 * @param options.scale - The number of decimal places to represent.
 *
 * @returns The created Dinero object.
 *
 * @public
 */
export const dinero = createDinero({
  calculator,
  formatter: {
    toNumber: Number,
    toString: String,
  },
  onCreate({ amount, scale }) {
    assert(Number.isInteger(amount), INVALID_AMOUNT_MESSAGE);
    assert(Number.isInteger(scale), INVALID_SCALE_MESSAGE);
  },
});
