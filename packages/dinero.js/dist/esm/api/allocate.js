import { safeAllocate } from '@dinero.js/core';
/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject - The Dinero object to allocate from.
 * @param ratios - The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function allocate() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    ratios = _ref[1];
  var calculator = dineroObject.calculator;
  var allocateFn = safeAllocate(calculator);
  return allocateFn(dineroObject, ratios);
}