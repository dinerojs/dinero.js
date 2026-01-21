import { greaterThan } from '../utils';
export function isPositive(calculator) {
  var greaterThanFn = greaterThan(calculator);
  return function _isPositive() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount;
    return greaterThanFn(amount, calculator.zero());
  };
}