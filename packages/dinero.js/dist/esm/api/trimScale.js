import { trimScale as coreTrimScale } from '@dinero.js/core';
/**
 * Trim a Dinero object's scale as much as possible, down to the currency exponent.
 *
 * @param dineroObject - The Dinero object which scale to trim.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function trimScale() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator = dineroObject.calculator;
  var trimScaleFn = coreTrimScale(calculator);
  return trimScaleFn(dineroObject);
}