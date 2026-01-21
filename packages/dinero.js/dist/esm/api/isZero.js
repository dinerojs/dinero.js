import { isZero as coreIsZero } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 *
 * @public
 */
export function isZero() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator = dineroObject.calculator;
  var isZeroFn = coreIsZero(calculator);
  return isZeroFn(dineroObject);
}