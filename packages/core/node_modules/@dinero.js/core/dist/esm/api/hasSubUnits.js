import { computeBase, equal } from '../utils';
export function hasSubUnits(calculator) {
  var equalFn = equal(calculator);
  var computeBaseFn = computeBase(calculator);
  return function _hasSubUnits() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }
    var dineroObject = _ref[0];
    var _dineroObject$toJSON = dineroObject.toJSON(),
      amount = _dineroObject$toJSON.amount,
      currency = _dineroObject$toJSON.currency,
      scale = _dineroObject$toJSON.scale;
    var base = computeBaseFn(currency.base);
    return !equalFn(calculator.modulo(amount, calculator.power(base, scale)), calculator.zero());
  };
}