import { toUnits as coreToUnits } from '@dinero.js/core';
/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in units.
 *
 * @public
 */
export function toUnits() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    transformer = _ref[1];
  var calculator = dineroObject.calculator;
  var toUnitsFn = coreToUnits(calculator);
  return toUnitsFn(dineroObject, transformer);
}