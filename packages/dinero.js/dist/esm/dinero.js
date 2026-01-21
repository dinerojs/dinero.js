import { calculator } from '@dinero.js/calculator-number';
import { createDinero, assert, INVALID_AMOUNT_MESSAGE, INVALID_SCALE_MESSAGE } from '@dinero.js/core';

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
export var dinero = createDinero({
  calculator: calculator,
  onCreate: function onCreate(_ref) {
    var amount = _ref.amount,
      scale = _ref.scale;
    assert(Number.isInteger(amount), INVALID_AMOUNT_MESSAGE);
    assert(Number.isInteger(scale), INVALID_SCALE_MESSAGE);
  }
});