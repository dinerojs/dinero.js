import { hasSubUnits as coreHasSubUnits } from '@dinero.js/core';
/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 *
 * @public
 */
export function hasSubUnits() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0];
  var calculator = dineroObject.calculator;
  var hasSubUnitsFn = coreHasSubUnits(calculator);
  return hasSubUnitsFn(dineroObject);
}