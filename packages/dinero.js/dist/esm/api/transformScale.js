import { transformScale as coreTransformScale } from '@dinero.js/core';
/**
 * Transform a Dinero object to a new scale.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param newScale - The new scale.
 * @param divide - A custom divide function.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function transformScale() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    newScale = _ref[1],
    divide = _ref[2];
  var calculator = dineroObject.calculator;
  var transformScaleFn = coreTransformScale(calculator);
  return transformScaleFn(dineroObject, newScale, divide);
}