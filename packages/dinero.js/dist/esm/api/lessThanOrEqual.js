import { safeLessThanOrEqual } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is lesser than or equal to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than or equal to the other.
 *
 * @public
 */
export function lessThanOrEqual() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    comparator = _ref[1];
  var calculator = dineroObject.calculator;
  var lessThanOrEqualFn = safeLessThanOrEqual(calculator);
  return lessThanOrEqualFn(dineroObject, comparator);
}