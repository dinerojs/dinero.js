import { lessThan } from '../utils';
export function isNegative(calculator) {
  var lessThanFn = lessThan(calculator);
  return function _isNegative() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount;
    return lessThanFn(amount, calculator.zero());
  };
}