import { safeCompare } from '@dinero.js/core';
/**
 * Compare the value of a Dinero object relative to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns One of -1, 0, or 1 depending on whether the first Dinero object is less than, equal to, or greater than the other.
 *
 * @public
 */
export function compare() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    comparator = _ref[1];
  var calculator = dineroObject.calculator;
  var compareFn = safeCompare(calculator);
  return compareFn(dineroObject, comparator);
}