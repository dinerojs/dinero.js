import { normalizeScale as coreNormalizeScale } from '@dinero.js/core';
/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects - The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 *
 * @public
 */
export function normalizeScale() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObjects = _ref[0];
  var calculator = dineroObjects[0].calculator;
  var normalizeScaleFn = coreNormalizeScale(calculator);
  return normalizeScaleFn(dineroObjects);
}