import { safeSubtract } from '@dinero.js/core';
/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend - The Dinero object to subtract from.
 * @param subtrahend - The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function subtract() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var minuend = _ref[0],
    subtrahend = _ref[1];
  var calculator = minuend.calculator;
  var subtractFn = safeSubtract(calculator);
  return subtractFn(minuend, subtrahend);
}