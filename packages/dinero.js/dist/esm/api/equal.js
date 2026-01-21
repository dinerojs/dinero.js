import { equal as coreEqual } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is equal to another.
 *
 * @param dineroObject - The first Dinero object to compare.
 * @param comparator - The second Dinero object to compare.
 *
 * @returns Whether the Dinero objects are equal.
 *
 * @public
 */
export function equal() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    comparator = _ref[1];
  var calculator = dineroObject.calculator;
  var equalFn = coreEqual(calculator);
  return equalFn(dineroObject, comparator);
}