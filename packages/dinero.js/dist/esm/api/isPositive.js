import { isPositive as coreIsPositive } from '@dinero.js/core';
/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is positive.
 *
 * @public
 */
export function isPositive() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator = dineroObject.calculator;
  var isPositiveFn = coreIsPositive(calculator);
  return isPositiveFn(dineroObject);
}