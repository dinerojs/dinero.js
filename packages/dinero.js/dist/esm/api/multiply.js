import { multiply as coreMultiply } from '@dinero.js/core';
/**
 * Multiply the passed Dinero object.
 *
 * @param multiplicand - The Dinero object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function multiply() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var multiplicand = _ref[0],
    multiplier = _ref[1];
  var calculator = multiplicand.calculator;
  var multiplyFn = coreMultiply(calculator);
  return multiplyFn(multiplicand, multiplier);
}