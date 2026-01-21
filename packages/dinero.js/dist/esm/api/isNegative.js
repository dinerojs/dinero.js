import { isNegative as coreIsNegative } from '@dinero.js/core';
/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is negative.
 *
 * @public
 */
export function isNegative() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator = dineroObject.calculator;
  var isNegativeFn = coreIsNegative(calculator);
  return isNegativeFn(dineroObject);
}