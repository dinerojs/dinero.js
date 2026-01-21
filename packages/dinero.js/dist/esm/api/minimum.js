import { safeMinimum } from '@dinero.js/core';
/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function minimum() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObjects = _ref[0];
  var calculator = dineroObjects[0].calculator;
  var minimumFn = safeMinimum(calculator);
  return minimumFn(dineroObjects);
}