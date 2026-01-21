import { convert as coreConvert } from '@dinero.js/core';
/**
 * Convert a Dinero object to another currency.
 *
 * @param dineroObject - The Dinero object to format.
 * @param newCurrency - The currency to convert to.
 * @param rates - The rates to convert with.
 *
 * @returns A converted Dinero object.
 *
 * @public
 */
export function convert() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var dineroObject = _ref[0],
    newCurrency = _ref[1],
    rates = _ref[2];
  var calculator = dineroObject.calculator;
  var converter = coreConvert(calculator);
  return converter(dineroObject, newCurrency, rates);
}