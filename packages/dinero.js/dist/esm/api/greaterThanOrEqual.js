import { safeGreaterThanOrEqual } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 *
 * @public
 */
export function greaterThanOrEqual() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    comparator = _ref[1];
  var calculator = dineroObject.calculator;
  var greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator);
  return greaterThanOrEqualFn(dineroObject, comparator);
}