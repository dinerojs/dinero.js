import { safeAdd } from '@dinero.js/core';
/**
 * Add up the passed Dinero objects.
 *
 * @param augend - The Dinero object to add to.
 * @param addend - The Dinero object to add.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function add() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var augend = _ref[0],
    addend = _ref[1];
  var calculator = augend.calculator;
  var addFn = safeAdd(calculator);
  return addFn(augend, addend);
}