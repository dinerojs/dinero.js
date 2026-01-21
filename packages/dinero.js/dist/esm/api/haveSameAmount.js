import { haveSameAmount as coreHaveSameAmount } from '@dinero.js/core';
/**
 * Check whether a set of Dinero objects have the same amount.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same amount.
 *
 * @public
 */
export function haveSameAmount() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObjects = _ref[0];
  var calculator = dineroObjects[0].calculator;
  var haveSameAmountFn = coreHaveSameAmount(calculator);
  return haveSameAmountFn(dineroObjects);
}